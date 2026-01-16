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

// @ts-check

/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function up(knex) {
  await knex.schema.createTable('ai_conversations', table => {
    table.comment('AI conversations per user');

    table.string('id').primary();
    table
      .string('user_entity_ref')
      .notNullable()
      .comment('Entity ref for the conversation owner');
    table.string('title').notNullable();
    table.string('model_id').notNullable();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').notNullable();
    table.dateTime('deleted_at').nullable();

    table.index(['user_entity_ref', 'updated_at']);
    table.index(['deleted_at']);
  });

  await knex.schema.createTable('ai_conversation_messages', table => {
    table.comment('Messages for AI conversations');

    table.string('id').primary();
    table
      .string('conversation_id')
      .notNullable()
      .references('id')
      .inTable('ai_conversations')
      .onDelete('CASCADE');
    table.string('role').notNullable();
    table.text('content').notNullable();
    table.dateTime('created_at').notNullable();

    table.index(['conversation_id', 'created_at']);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function down(knex) {
  await knex.schema.dropTable('ai_conversation_messages');
  await knex.schema.dropTable('ai_conversations');
};
