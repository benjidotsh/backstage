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
import { InputError } from '@backstage/errors';
import { resolveSafeChildPath } from '@backstage/backend-plugin-api';
import fs from 'fs-extra';
import globby from 'globby';
import { examples } from './delete.examples';

/**
 * Creates new action that enables deletion of files and directories in the workspace.
 * @public
 */
export const createFilesystemDeleteAction = () => {
  return createTemplateAction({
    id: 'fs:delete',
    description: 'Deletes files and directories from the workspace',
    examples,
    schema: {
      input: {
        files: z =>
          z.array(z.string(), {
            description: 'A list of files and directories that will be deleted',
          }),
      },
    },
    supportsDryRun: true,
    async handler(ctx) {
      if (!Array.isArray(ctx.input?.files)) {
        throw new InputError('files must be an Array');
      }

      for (const file of ctx.input.files) {
        // globby cannot handle backslash file separators
        const safeFilepath = resolveSafeChildPath(
          ctx.workspacePath,
          file,
        ).replace(/\\/g, '/');
        const resolvedPaths = await globby(safeFilepath, {
          cwd: ctx.workspacePath,
          absolute: true,
          dot: true,
        });

        for (const filepath of resolvedPaths) {
          try {
            await fs.remove(filepath);
            ctx.logger.info(`File ${filepath} deleted successfully`);
          } catch (err) {
            ctx.logger.error(`Failed to delete file ${filepath}:`, err);
            throw err;
          }
        }
      }
    },
  });
};
