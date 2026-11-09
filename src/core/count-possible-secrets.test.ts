import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from './count-possible-secrets.js';

describe('countPossibleSecrets', () => {
  it('returns 1 for an empty secret', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('returns the base for a single digit', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
  });

  it('counts permutations for base 2', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('counts permutations for base 8', () => {
    expect(countPossibleSecrets(3, 8)).toBe(336);
  });

  it('counts permutations for base 10 including leading zeros', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('counts permutations for base 16', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  it('returns 0 when the length exceeds the base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });

  it('returns the same value on repeated calls', () => {
    expect(countPossibleSecrets(5, 10)).toBe(countPossibleSecrets(5, 10));
  });
});
