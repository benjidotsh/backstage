/*
 * Copyright 2026 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useApi } from '@backstage/frontend-plugin-api';
import {
  Box,
  Button,
  ButtonIcon,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  Select,
  Tag,
  TagGroup,
  Text,
  TextField,
} from '@backstage/ui';
import {
  RiAddLine,
  RiDeleteBinLine,
  RiMessage2Line,
  RiRobot2Line,
  RiSendPlane2Line,
  RiSparkling2Line,
} from '@remixicon/react';
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  aiApiRef,
  ConversationMessage,
  ConversationSummary,
  ModelInfo,
} from '../../api';
import styles from './AiChatPage.module.css';

type UiMessage = ConversationMessage & {
  streaming?: boolean;
};

const createLocalId = () =>
  `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const formatTimestamp = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

const trimTitle = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Untitled';
  }
  return trimmed.length > 42 ? `${trimmed.slice(0, 42)}…` : trimmed;
};

export const AiChatPage = () => {
  const aiApi = useApi(aiApiRef);
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [loadingList, setLoadingList] = useState(false);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const streamAbortRef = useRef<AbortController | null>(null);
  const refreshOnDoneRef = useRef(false);

  useEffect(() => {
    const load = async () => {
      try {
        const modelsResponse = await aiApi.listModels();
        setModels(modelsResponse);
        setSelectedModelId(prev => prev ?? modelsResponse[0]?.id ?? null);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    };
    load();
  }, [aiApi]);

  const loadConversations = useCallback(async () => {
    setLoadingList(true);
    try {
      const items = await aiApi.listConversations();
      setConversations(items);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoadingList(false);
    }
  }, [aiApi]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      streamAbortRef.current?.abort();
    };
  }, []);

  const modelOptions = useMemo(
    () =>
      models.map(model => ({
        value: model.id,
        label: model.title,
      })),
    [models],
  );

  const activeConversation = useMemo(
    () =>
      conversations.find(item => item.id === selectedConversationId) ?? null,
    [conversations, selectedConversationId],
  );

  const selectedModelLabel = useMemo(() => {
    if (!selectedModelId) {
      return null;
    }
    return (
      models.find(model => model.id === selectedModelId)?.title ??
      selectedModelId
    );
  }, [models, selectedModelId]);

  const headerStatus = useMemo(() => {
    if (loadingConversation) {
      return 'Loading transcript…';
    }
    if (!selectedModelId) {
      return 'Select a model to begin';
    }
    return `Model: ${selectedModelLabel ?? selectedModelId}`;
  }, [loadingConversation, selectedModelId, selectedModelLabel]);

  const handleSelectConversation = useCallback(
    async (conversationId: string) => {
      setSelectedConversationId(conversationId);
      setLoadingConversation(true);
      try {
        const detail = await aiApi.getConversation(conversationId);
        setMessages(detail.messages);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoadingConversation(false);
      }
    },
    [aiApi],
  );

  const handleNewConversation = useCallback(() => {
    setSelectedConversationId(null);
    setMessages([]);
  }, []);

  const handleDeleteConversation = useCallback(
    async (conversationId: string) => {
      try {
        await aiApi.deleteConversation(conversationId);
        setConversations(prev =>
          prev.filter(item => item.id !== conversationId),
        );
        if (selectedConversationId === conversationId) {
          setSelectedConversationId(null);
          setMessages([]);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    },
    [aiApi, selectedConversationId],
  );

  const handleSend = useCallback(async () => {
    if (!draft.trim() || !selectedModelId || streaming) {
      return;
    }

    setError(null);
    setStreaming(true);

    const userMessage: UiMessage = {
      id: createLocalId(),
      role: 'user',
      content: draft.trim(),
      createdAt: new Date().toISOString(),
    };
    const assistantId = createLocalId();
    const assistantMessage: UiMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      streaming: true,
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setDraft('');

    streamAbortRef.current?.abort();
    const controller = new AbortController();
    streamAbortRef.current = controller;
    refreshOnDoneRef.current = false;

    try {
      await aiApi.streamChat({
        message: userMessage.content,
        modelId: selectedModelId,
        conversationId: selectedConversationId ?? undefined,
        signal: controller.signal,
        onConversation: event => {
          if (!selectedConversationId) {
            setSelectedConversationId(event.conversation.id);
          }

          if (event.persisted) {
            refreshOnDoneRef.current = true;
            setConversations(prev => {
              const existing = prev.find(
                item => item.id === event.conversation.id,
              );
              if (existing) {
                return prev.map(item =>
                  item.id === event.conversation.id ? event.conversation : item,
                );
              }
              return [event.conversation, ...prev];
            });
          }
        },
        onDelta: delta => {
          setMessages(prev =>
            prev.map(message =>
              message.id === assistantId
                ? { ...message, content: `${message.content}${delta}` }
                : message,
            ),
          );
        },
        onDone: event => {
          setMessages(prev =>
            prev.map(message =>
              message.id === assistantId
                ? { ...message, streaming: false }
                : message,
            ),
          );

          if (refreshOnDoneRef.current) {
            setConversations(prev =>
              prev.map(item =>
                item.id === event.conversationId
                  ? { ...item, updatedAt: event.updatedAt }
                  : item,
              ),
            );
          }
        },
        onError: streamError => {
          setError(streamError.message);
        },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setStreaming(false);
    }
  }, [aiApi, draft, selectedConversationId, selectedModelId, streaming]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Flex gap="3" align="center">
          <Box as="span" className={styles.headerIcon}>
            <RiSparkling2Line />
          </Box>
          <Box>
            <Text variant="title-large" className={styles.title}>
              AI Atelier
            </Text>
            <Text variant="body-medium" className={styles.subtitle}>
              A calm studio for continuous conversations.
            </Text>
          </Box>
        </Flex>
        <Flex gap="2" align="center" className={styles.headerActions}>
          <Select
            label="Model"
            aria-label="Model"
            options={modelOptions}
            selectedKey={selectedModelId ?? undefined}
            onSelectionChange={key => setSelectedModelId(String(key))}
          />
          <Button
            variant="secondary"
            iconStart={<RiAddLine />}
            onPress={handleNewConversation}
          >
            New
          </Button>
        </Flex>
      </Box>

      <Grid.Root
        columns={{ initial: '1', md: '3' }}
        gap="4"
        className={styles.grid}
      >
        <Grid.Item colSpan={{ initial: '1', md: '1' }}>
          <Card className={styles.sidebar}>
            <CardHeader className={styles.cardHeader}>
              <Flex justify="between" align="center">
                <Flex gap="2" align="center">
                  <RiMessage2Line />
                  <Text variant="title-small">Conversations</Text>
                </Flex>
                <Text variant="body-small" className={styles.muted}>
                  {loadingList ? 'Loading…' : `${conversations.length} saved`}
                </Text>
              </Flex>
            </CardHeader>
            <CardBody className={styles.cardBody}>
              <Flex direction="column" gap="2">
                {conversations.length === 0 ? (
                  <Box className={styles.emptyState}>
                    <RiRobot2Line />
                    <Text variant="body-medium">Start a new thread.</Text>
                    <Text variant="body-small" className={styles.muted}>
                      Conversations stay here when you are signed in.
                    </Text>
                  </Box>
                ) : (
                  conversations.map(conversation => (
                    <Box
                      key={conversation.id}
                      className={
                        conversation.id === selectedConversationId
                          ? styles.conversationActive
                          : styles.conversationItem
                      }
                    >
                      <Button
                        variant="tertiary"
                        className={styles.conversationButton}
                        onPress={() =>
                          handleSelectConversation(conversation.id)
                        }
                      >
                        <Box>
                          <Text variant="body-medium">
                            {trimTitle(conversation.title)}
                          </Text>
                          <Text variant="body-small" className={styles.muted}>
                            {formatTimestamp(conversation.updatedAt)}
                          </Text>
                        </Box>
                      </Button>
                      <ButtonIcon
                        icon={<RiDeleteBinLine />}
                        variant="tertiary"
                        aria-label="Delete conversation"
                        onPress={() =>
                          handleDeleteConversation(conversation.id)
                        }
                      />
                    </Box>
                  ))
                )}
              </Flex>
            </CardBody>
          </Card>
        </Grid.Item>

        <Grid.Item colSpan={{ initial: '1', md: '2' }}>
          <Card className={styles.chat}>
            <CardHeader className={styles.cardHeader}>
              <Flex justify="between" align="center">
                <Box>
                  <Text variant="title-small">
                    {activeConversation?.title ?? 'New conversation'}
                  </Text>
                  <Text variant="body-small" className={styles.muted}>
                    {headerStatus}
                  </Text>
                </Box>
                {selectedModelId && (
                  <TagGroup
                    aria-label="Selected model"
                    items={[
                      {
                        id: selectedModelId,
                        label: selectedModelLabel ?? selectedModelId,
                      },
                    ]}
                  >
                    {item => <Tag>{item.label}</Tag>}
                  </TagGroup>
                )}
              </Flex>
            </CardHeader>
            <CardBody className={styles.chatBody}>
              <Flex direction="column" gap="3">
                {messages.length === 0 ? (
                  <Box className={styles.emptyChat}>
                    <Text variant="body-medium">
                      Ask your first question to begin the thread.
                    </Text>
                    <Text variant="body-small" className={styles.muted}>
                      Streaming responses appear as you type.
                    </Text>
                  </Box>
                ) : (
                  messages.map(message => (
                    <Box
                      key={message.id}
                      className={
                        message.role === 'assistant'
                          ? styles.assistantBubble
                          : styles.userBubble
                      }
                    >
                      <Text variant="body-medium">{message.content}</Text>
                      <Text variant="body-x-small" className={styles.muted}>
                        {message.streaming
                          ? 'Typing…'
                          : formatTimestamp(message.createdAt)}
                      </Text>
                    </Box>
                  ))
                )}
                <div ref={messagesEndRef} />
              </Flex>
            </CardBody>
            <Box className={styles.composer}>
              {error && (
                <Box className={styles.errorBanner}>
                  <Text variant="body-small">{error}</Text>
                </Box>
              )}
              <Flex gap="2" align="center">
                <TextField
                  aria-label="Message"
                  placeholder="Compose a message"
                  value={draft}
                  onChange={setDraft}
                  onKeyDown={handleKeyDown}
                  className={styles.input}
                />
                <Button
                  iconEnd={<RiSendPlane2Line />}
                  onPress={handleSend}
                  loading={streaming}
                >
                  Send
                </Button>
              </Flex>
            </Box>
          </Card>
        </Grid.Item>
      </Grid.Root>
    </Box>
  );
};
