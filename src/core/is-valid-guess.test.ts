import { describe, it, expect } from 'vitest';
import { isValidGuess } from './is-valid-guess.js';

describe('isValidGuess', () => {
  it('accepts a guess of the right length with unique valid digits', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  });

  it('accepts a guess with a leading zero', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });

  it('rejects a guess that is too short', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
  });

  it('rejects a guess that is too long', () => {
    expect(isValidGuess('12345', 4, 10)).toBe(false);
  });

  it('rejects an empty guess', () => {
    expect(isValidGuess('', 4, 10)).toBe(false);
  });

  it('rejects a digit that does not exist in the base', () => {
    expect(isValidGuess('128', 3, 8)).toBe(false);
    expect(isValidGuess('12a', 3, 10)).toBe(false);
  });

  it('rejects repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
  });

  it('accepts both binary digits for base 2', () => {
    expect(isValidGuess('01', 2, 2)).toBe(true);
  });

  it('accepts hex digits in any case', () => {
    expect(isValidGuess('aB', 2, 16)).toBe(true);
  });

  it('treats the same hex digit in different case as a repeat', () => {
    expect(isValidGuess('aA', 2, 16)).toBe(false);
  });
});
