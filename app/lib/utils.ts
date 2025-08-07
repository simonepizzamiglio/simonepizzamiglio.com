import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Runtime assertion function that throws an error if the condition is falsy.
 * Used to assert invariants and preconditions in code.
 *
 * @param condition - The condition to check
 * @param message - Error message string or function that returns error message
 * @throws {Error} Throws if condition is falsy with provided message
 */
export function invariant(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  condition: any,
  message: string | (() => string),
): asserts condition {
  if (!condition) {
    throw new Error(typeof message === 'function' ? message() : message);
  }
}
