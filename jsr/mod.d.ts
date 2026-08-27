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

/** Return the absolute fixtures directory for a working directory. */
export function fixturesDir(cwd?: string): string;

/** Resolve the fixture destination for a live file or directory. */
export function frozenPath(filePath: string, cwd?: string): string;

/** Copy a file or directory into the fixtures tree byte-for-byte. */
export function freeze(filePath: string, cwd?: string): FreezeResult;

/** Compare a live file or directory against its frozen fixture. */
export function check(filePath: string, cwd?: string): CheckResult;

/** List all frozen fixture files relative to the fixtures directory. */
export function list(cwd?: string): string[];

/** Refresh an existing fixture from the current live file or directory. */
export function update(filePath: string, cwd?: string): FreezeResult;
