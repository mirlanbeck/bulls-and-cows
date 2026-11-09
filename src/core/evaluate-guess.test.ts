import { describe, it, expect } from 'vitest';
import { evaluateGuess } from './evaluate-guess.js';

describe('evaluateGuess', () => {
  it('counts only bulls for an exact match', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  it('returns zeros when no digit matches', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  it('counts only cows when all digits are in wrong positions', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });

  it('counts bulls and cows together', () => {
    expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
  });

  it('ignores digits that are not in the secret', () => {
    expect(evaluateGuess('1234', '1350')).toEqual({ bulls: 1, cows: 1 });
  });

  it('handles a leading zero like any other digit', () => {
    expect(evaluateGuess('0123', '0321')).toEqual({ bulls: 2, cows: 2 });
  });

  it('compares a lowercase secret with an uppercase guess', () => {
    expect(evaluateGuess('ab', 'AB')).toEqual({ bulls: 2, cows: 0 });
    expect(evaluateGuess('ab', 'BA')).toEqual({ bulls: 0, cows: 2 });
  });

  it('compares an uppercase secret with a lowercase guess', () => {
    expect(evaluateGuess('AB', 'ab')).toEqual({ bulls: 2, cows: 0 });
  });
});
