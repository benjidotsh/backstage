/*
 * Copyright 2021 The Backstage Authors
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

import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { resolveSafeChildPath } from '@backstage/backend-plugin-api';
import fs from 'fs-extra';
import { examples } from './rename.examples';
import { InputError } from '@backstage/errors';

/**
 * Creates a new action that allows renames of files and directories in the workspace.
 * @public
 */
export const createFilesystemRenameAction = () => {
  return createTemplateAction({
    id: 'fs:rename',
    description: 'Renames files and directories within the workspace',
    examples,
    schema: {
      input: {
        files: z =>
          z.array(
            z.object({
              from: z.string({
                description: 'The source location of the file to be renamed',
              }),
              to: z.string({
                description: 'The destination of the new file',
              }),
              overwrite: z
                .boolean({
                  description:
                    'Overwrite existing file or directory, default is false',
                })
                .optional(),
            }),
            {
              description:
                'A list of file and directory names that will be renamed',
            },
          ),
      },
    },
    supportsDryRun: true,
    async handler(ctx) {
      if (!Array.isArray(ctx.input?.files)) {
        throw new InputError('files must be an Array');
      }

      for (const file of ctx.input.files) {
        if (!file.from || !file.to) {
          throw new InputError('each file must have a from and to property');
        }
        const sourceFilepath = resolveSafeChildPath(
          ctx.workspacePath,
          file.from,
        );
        const destFilepath = resolveSafeChildPath(ctx.workspacePath, file.to);

        try {
          await fs.move(sourceFilepath, destFilepath, {
            overwrite: file.overwrite ?? false,
          });
          ctx.logger.info(
            `File ${sourceFilepath} renamed to ${destFilepath} successfully`,
          );
        } catch (err) {
          ctx.logger.error(
            `Failed to rename file ${sourceFilepath} to ${destFilepath}:`,
            err,
          );
          throw err;
        }
      }
    },
  });
};
