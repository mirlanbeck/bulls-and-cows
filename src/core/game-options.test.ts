import { describe, it, expect } from 'vitest';
import { getAvailableLengths } from './game-options.js';

describe('getAvailableLengths', () => {
  it('offers only length 2 for base 2', () => {
    expect(getAvailableLengths(2)).toEqual([2]);
  });

  it('offers lengths 2 to 6 for base 8', () => {
    expect(getAvailableLengths(8)).toEqual([2, 3, 4, 5, 6]);
  });

  it('offers lengths 2 to 6 for base 10', () => {
    expect(getAvailableLengths(10)).toEqual([2, 3, 4, 5, 6]);
  });

  it('offers lengths 2 to 6 for base 16', () => {
    expect(getAvailableLengths(16)).toEqual([2, 3, 4, 5, 6]);
  });
});
