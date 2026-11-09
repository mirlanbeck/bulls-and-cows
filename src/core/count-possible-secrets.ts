import { memoize } from './memoize.js';

export const countPossibleSecrets: (length: number, base: number) => number = memoize(
  (length: number, base: number): number => {
    if (length > base) {
      return 0;
    }

    if (length === 0) {
      return 1;
    }

    return base * countPossibleSecrets(length - 1, base - 1);
  },
);
