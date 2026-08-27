/**
 * Freeze files and directories into deterministic fixtures and compare them byte-for-byte.
 *
 * @module
 */

/** Read-only package metadata exposed by FixtureFreeze. */
export interface PackageMetadata {
  /** JSR package name. */
  readonly name: "@theworker02/fixturefreeze";
  /** Current package version. */
  readonly version: "1.2.0";
  /** Primary runtime family. */
  readonly runtime: "node";
  /** Canonical package registry. */
  readonly registry: "jsr";
}

/** Result returned when freezing a file or directory. */
export interface FreezeResult {
  /** Whether the freeze operation completed successfully. */
  ok: true;
  /** Absolute source path. */
  src: string;
  /** Absolute fixture destination path. */
  dest: string;
  /** Kind of source that was frozen. */
  kind: "file" | "dir";
}

/** Result returned when checking live content against a frozen fixture. */
export interface CheckResult {
  /** Whether the live content exactly matches its fixture. */
  ok: boolean;
  /** Human-readable comparison result. */
  reason: string;
  /** Absolute live source path. */
  src: string;
  /** Absolute fixture path. */
  dest: string;
  /** Relative live file list when directory structure differs. */
  live?: string[];
  /** Relative frozen file list when directory structure differs. */
  frozen?: string[];
  /** Number of compared files for a successful directory check. */
  files?: number;
}

/** Package identity and release metadata. */
export const PACKAGE: PackageMetadata;

/** Directory name used for frozen fixtures. */
export const FIXTURE_DIRNAME: "fixtures";

/** Return the absolute fixtures directory for a working directory. */
export function fixturesDir(cwd?: string): string;

/** Resolve the fixture destination for a live file or directory. */
export function frozenPath(filePath: string, cwd?: string): string;

/** Return whether a frozen fixture currently exists for a live path. */
export function fixtureExists(filePath: string, cwd?: string): boolean;

/** Copy a file or directory into the fixtures tree byte-for-byte. */
export function freeze(filePath: string, cwd?: string): FreezeResult;

/** Compare a live file or directory against its frozen fixture. */
export function check(filePath: string, cwd?: string): CheckResult;

/** List all frozen fixture files relative to the fixtures directory. */
export function list(cwd?: string): string[];

/** Refresh an existing fixture from the current live file or directory. */
export function update(filePath: string, cwd?: string): FreezeResult;
