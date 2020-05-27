/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as firestore from '../../index';

import { FieldPath as InternalFieldPath } from '../../../src/model/path';
import { validateNamedArrayAtLeastNumberOfElements } from '../../../src/util/input_validation';
import { Code, FirestoreError } from '../../../src/util/error';
import { hardCast } from '../../../src/util/assert';

/**
 * A FieldPath refers to a field in a document. The path may consist of a single
 * field name (referring to a top-level field in the document), or a list of
 * field names (referring to a nested field in the document).
 */
export class FieldPath implements firestore.FieldPath {
  /** Internal representation of a Firestore field path. */
  _internalPath: InternalFieldPath;

  /**
   * Creates a FieldPath from the provided field names. If more than one field
   * name is provided, the path will point to a nested field in a document.
   *
   * @param fieldNames A list of field names.
   */
  constructor(...fieldNames: string[]) {
    validateNamedArrayAtLeastNumberOfElements(
      'FieldPath',
      fieldNames,
      'fieldNames',
      1
    );

    for (let i = 0; i < fieldNames.length; ++i) {
      if (fieldNames[i].length === 0) {
        throw new FirestoreError(
          Code.INVALID_ARGUMENT,
          `Invalid field name at argument $(i + 1). ` +
            'Field names must not be empty.'
        );
      }
    }

    this._internalPath = new InternalFieldPath(fieldNames);
  }

  isEqual(other: firestore.FieldPath): boolean {
    const path = hardCast(other, FieldPath);
    return this._internalPath.isEqual(path._internalPath);
  }
}
