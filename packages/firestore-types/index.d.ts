/**
 * @license
 * Copyright 2017 Google LLC
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

import { FirebaseApp, FirebaseNamespace } from '@firebase/app-types';

import {
  DocumentReference,
  Query,
  FirestoreError,
  DocumentData,
  FieldPath,
  DocumentChange,
  CollectionReference
} from './lite';

export {
  DocumentData,
  UpdateData,
  LogLevel,
  setLogLevel,
  GeoPoint,
  Timestamp,
  Blob,
  Transaction,
  WriteBatch,
  SetOptions,
  DocumentReference,
  OrderByDirection,
  WhereFilterOp,
  Query,
  DocumentChangeType,
  DocumentChange,
  CollectionReference,
  FieldValue,
  FieldPath,
  documentId,
  FirestoreErrorCode,
  FirestoreError,
  terminate,
  writeBatch,
  runTransaction,
  deleteDocument,
  updateDocument,
  setDocument,
  addDocument
} from './lite';

export const CACHE_SIZE_UNLIMITED: number;

export interface Persistence {}

export interface Settings {
  host?: string;
  ssl?: boolean;
  cacheSizeBytes?: number;
  experimentalForceLongPolling?: boolean;
}

export class FirebaseFirestore {
  private constructor();

  settings: Settings;

  collection(collectionPath: string): CollectionReference<DocumentData>;

  doc(documentPath: string): DocumentReference<DocumentData>;

  collectionGroup(collectionId: string): Query<DocumentData>;
}

export interface GetOptions {
  readonly source?: 'default' | 'server' | 'cache';
}

export interface SnapshotOptions {
  readonly serverTimestamps?: 'estimate' | 'previous' | 'none';
}

export interface SnapshotListenOptions {
  readonly includeMetadataChanges?: boolean;
}

export interface SnapshotMetadata {
  readonly hasPendingWrites: boolean;
  readonly fromCache: boolean;

  isEqual(other: SnapshotMetadata): boolean;
}

export interface FirestoreDataConverter<T> {
  toFirestore(modelObject: T): DocumentData;

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T;
}

// MARK: Initialization methods
export function startMemoryPersistence(
  firstore: FirebaseFirestore
): Promise<void>;
export function startIndexedDbPersistence(
  firstore: FirebaseFirestore
): Promise<void>;
export function startIndexedDbOrMemoryPersistence(
  firstore: FirebaseFirestore
): Promise<void>;
export function startMultiTabIndexedDbPersistence(
  firstore: FirebaseFirestore
): Promise<void>;
export function startMultiTabIndexedDbOrMemoryPersistence(
  firstore: FirebaseFirestore
): Promise<void>;

export class DocumentSnapshot<T = DocumentData> {
  protected constructor();

  readonly exists: boolean;
  readonly ref: DocumentReference<T>;
  readonly id: string;
  readonly metadata: SnapshotMetadata;

  data(options?: SnapshotOptions): T | undefined;

  get(fieldPath: string | FieldPath, options?: SnapshotOptions): any;
}

export class QueryDocumentSnapshot<T = DocumentData> extends DocumentSnapshot<
  T
> {
  private constructor();

  data(options?: SnapshotOptions): T;
}

export class QuerySnapshot<T = DocumentData> {
  private constructor();

  readonly query: Query<T>;
  readonly metadata: SnapshotMetadata;
  readonly docs: Array<QueryDocumentSnapshot<T>>;
  readonly size: number;
  readonly empty: boolean;

  docChanges(options?: SnapshotListenOptions): Array<DocumentChange<T>>;

  forEach(
    callback: (result: QueryDocumentSnapshot<T>) => void,
    thisArg?: any
  ): void;
}

// MARK: Firestore methods
export function waitForPendingWrites(
  firestore: FirebaseFirestore
): Promise<void>;
export function clearPersistence(firestore: FirebaseFirestore): Promise<void>;
export function enableNetwork(firestore: FirebaseFirestore): Promise<void>;
export function disableNetwork(firestore: FirebaseFirestore): Promise<void>;

export function onSnapshotsInSync(
  firestore: FirebaseFirestore,
  observer: {
    next?: (value: void) => void;
    error?: (error: Error) => void;
    complete?: () => void;
  }
): () => void;
export function onSnapshotsInSync(
  firestore: FirebaseFirestore,
  onSync: () => void
): () => void;

// MARK: DocumentReference methods
export function getDocument<T>(
  reference: DocumentReference<T>,
  options?: GetOptions
): Promise<DocumentSnapshot<T>>;

export function getDocuments<T>(
  query: Query<T>,
  options?: GetOptions
): Promise<QuerySnapshot<T>>;
export function onSnapshot<T>(
  reference: DocumentReference<T>,
  observer: {
    next?: (snapshot: DocumentSnapshot<T>) => void;
    error?: (error: FirestoreError) => void;
    complete?: () => void;
  }
): () => void;
export function onSnapshot<T>(
  reference: DocumentReference<T>,
  options: SnapshotListenOptions,
  observer: {
    next?: (snapshot: DocumentSnapshot<T>) => void;
    error?: (error: Error) => void;
    complete?: () => void;
  }
): () => void;
export function onSnapshot<T>(
  reference: DocumentReference<T>,
  onNext: (snapshot: DocumentSnapshot<T>) => void,
  onError?: (error: Error) => void,
  onCompletion?: () => void
): () => void;
export function onSnapshot<T>(
  reference: DocumentReference<T>,
  options: SnapshotListenOptions,
  onNext: (snapshot: DocumentSnapshot<T>) => void,
  onError?: (error: Error) => void,
  onCompletion?: () => void
): () => void;

// MARK: CollectionReference methods
export function onSnapshot<T>(
  query: Query<T>,
  observer: {
    next?: (snapshot: QuerySnapshot<T>) => void;
    error?: (error: Error) => void;
    complete?: () => void;
  }
): () => void;
export function onSnapshot<T>(
  query: Query<T>,
  options: SnapshotListenOptions,
  observer: {
    next?: (snapshot: QuerySnapshot<T>) => void;
    error?: (error: Error) => void;
    complete?: () => void;
  }
): () => void;
export function onSnapshot<T>(
  query: Query<T>,
  onNext: (snapshot: QuerySnapshot<T>) => void,
  onError?: (error: Error) => void,
  onCompletion?: () => void
): () => void;
export function onSnapshot<T>(
  query: Query<T>,
  options: SnapshotListenOptions,
  onNext: (snapshot: QuerySnapshot<T>) => void,
  onError?: (error: Error) => void,
  onCompletion?: () => void
): () => void;

// MARK: Equals methods
export function referencesEqual(
  l: DocumentReference | CollectionReference,
  r: DocumentReference | CollectionReference
): boolean;
export function queriesEqual(l: Query, r: Query): boolean;
export function snapshotsEqual(
  l: DocumentSnapshot | QuerySnapshot,
  r: DocumentSnapshot | QuerySnapshot
): boolean;

declare module '@firebase/component' {
  interface NameServiceMapping {
    'firestore': FirebaseFirestore;
  }
}
