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
import crypto from 'node:crypto';
import {
  DatabaseService,
  resolvePackagePath,
} from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { Knex } from 'knex';
import { ChatMessage, ConversationSummary } from '../models/types';

export interface ConversationStore {
  createConversation(options: {
    userEntityRef: string;
    title: string;
    modelId: string;
  }): Promise<ConversationSummary>;
  listConversations(options: {
    userEntityRef: string;
  }): Promise<ConversationSummary[]>;
  getConversation(options: {
    userEntityRef: string;
    conversationId: string;
  }): Promise<ConversationSummary>;
  getConversationMessages(options: {
    userEntityRef: string;
    conversationId: string;
  }): Promise<ChatMessage[]>;
  addMessage(options: {
    conversationId: string;
    role: ChatMessage['role'];
    content: string;
  }): Promise<ChatMessage>;
  updateConversationUpdatedAt(options: {
    conversationId: string;
    updatedAt: string;
  }): Promise<void>;
  softDeleteConversation(options: {
    userEntityRef: string;
    conversationId: string;
  }): Promise<void>;
}

type DbConversationRow = {
  id: string;
  user_entity_ref: string;
  title: string;
  model_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type DbMessageRow = {
  id: string;
  conversation_id: string;
  role: ChatMessage['role'];
  content: string;
  created_at: string;
};

const migrationsDir = resolvePackagePath(
  '@backstage/plugin-ai-backend',
  'migrations',
);

export class DatabaseConversationStore implements ConversationStore {
  static async create(options: {
    database: DatabaseService;
  }): Promise<DatabaseConversationStore> {
    const { database } = options;
    const client = await database.getClient();

    if (!database.migrations?.skip) {
      await client.migrate.latest({ directory: migrationsDir });
    }

    return new DatabaseConversationStore(client);
  }

  private readonly db: Knex;

  private constructor(db: Knex) {
    this.db = db;
  }

  async createConversation(options: {
    userEntityRef: string;
    title: string;
    modelId: string;
  }): Promise<ConversationSummary> {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const row: DbConversationRow = {
      id,
      user_entity_ref: options.userEntityRef,
      title: options.title,
      model_id: options.modelId,
      created_at: createdAt,
      updated_at: createdAt,
      deleted_at: null,
    };

    await this.db<DbConversationRow>('ai_conversations').insert(row);

    return {
      id,
      title: options.title,
      modelId: options.modelId,
      createdAt,
      updatedAt: createdAt,
    };
  }

  async listConversations(options: {
    userEntityRef: string;
  }): Promise<ConversationSummary[]> {
    const rows = await this.db<DbConversationRow>('ai_conversations')
      .where({ user_entity_ref: options.userEntityRef })
      .whereNull('deleted_at')
      .orderBy('updated_at', 'desc');

    return rows.map(row => ({
      id: row.id,
      title: row.title,
      modelId: row.model_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async getConversation(options: {
    userEntityRef: string;
    conversationId: string;
  }): Promise<ConversationSummary> {
    const row = await this.db<DbConversationRow>('ai_conversations')
      .where({
        id: options.conversationId,
        user_entity_ref: options.userEntityRef,
      })
      .whereNull('deleted_at')
      .first();

    if (!row) {
      throw new NotFoundError('Conversation not found');
    }

    return {
      id: row.id,
      title: row.title,
      modelId: row.model_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async getConversationMessages(options: {
    userEntityRef: string;
    conversationId: string;
  }): Promise<ChatMessage[]> {
    await this.getConversation(options);

    const rows = await this.db<DbMessageRow>('ai_conversation_messages')
      .where({ conversation_id: options.conversationId })
      .orderBy('created_at', 'asc');

    return rows.map(row => ({
      id: row.id,
      role: row.role,
      content: row.content,
      createdAt: row.created_at,
    }));
  }

  async addMessage(options: {
    conversationId: string;
    role: ChatMessage['role'];
    content: string;
  }): Promise<ChatMessage> {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await this.db<DbMessageRow>('ai_conversation_messages').insert({
      id,
      conversation_id: options.conversationId,
      role: options.role,
      content: options.content,
      created_at: createdAt,
    });

    return {
      id,
      role: options.role,
      content: options.content,
      createdAt,
    };
  }

  async updateConversationUpdatedAt(options: {
    conversationId: string;
    updatedAt: string;
  }): Promise<void> {
    await this.db<DbConversationRow>('ai_conversations')
      .where({ id: options.conversationId })
      .update({ updated_at: options.updatedAt });
  }

  async softDeleteConversation(options: {
    userEntityRef: string;
    conversationId: string;
  }): Promise<void> {
    const updated = await this.db<DbConversationRow>('ai_conversations')
      .where({
        id: options.conversationId,
        user_entity_ref: options.userEntityRef,
      })
      .whereNull('deleted_at')
      .update({ deleted_at: new Date().toISOString() });

    if (!updated) {
      throw new NotFoundError('Conversation not found');
    }
  }
}
