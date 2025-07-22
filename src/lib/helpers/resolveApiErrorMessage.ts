import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type ErrorDataPayload = {
  error: string;
};

/**
 * Resolves various error shapes into a user-friendly error message.
 *
 * @param err - The error to interpret, which may be of different types
 * (Error, string, FetchBaseQueryError, SerializedError, etc.).
 * @returns A string message if an error is present; otherwise, undefined.
 */
export function resolveApiErrorMessage(err: unknown): string | undefined {
  // 1. No error at all
  if (err === null || err === undefined) {
    return undefined;
  }

  // 2. Native Error or subclass
  if (err instanceof Error) {
    return err.message;
  }

  // 3. Raw string thrown
  if (typeof err === 'string' && err.trim().length > 0) {
    return err;
  }

  // 4. FetchBaseQueryError style
  if (isFetchBaseQueryError(err)) {
    const data = err.data as ErrorDataPayload;
    if (typeof data.error === 'string' && data.error.trim()) {
      return data.error;
    }
  }

  // 5. SerializedError shape
  if (
    typeof err === 'object' &&
    'message' in err &&
    typeof (err as SerializedError).message === 'string'
  ) {
    return (err as SerializedError).message;
  }

  // 6. Dev fallback
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[getErrorMessage] Unexpected error shape:', err);
  }

  return 'An error occurred while fetching pets.';
}

/**
 * Type guard to identify FetchBaseQueryError objects.
 *
 * @param err - The value to check.
 * @returns True if the value matches the FetchBaseQueryError shape; otherwise, false.
 */
function isFetchBaseQueryError(err: unknown): err is FetchBaseQueryError {
  if (typeof err !== 'object' || err === null) return false;
  const hasStatus = 'status' in err;
  const hasData = 'data' in err;
  return hasStatus && hasData;
}
