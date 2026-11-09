import { afterEach, describe, it, expect, vi } from 'vitest';
import { generateSecret } from './generate-secret.js';

const createSequenceRandom = (values: readonly number[]): (() => number) => {
  let callCount = 0;

  return () => values[callCount++ % values.length] ?? 0;
};

const ALWAYS_FIRST = (): number => 0;
const ALWAYS_LAST = (): number => 0.999;

describe('generateSecret', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a secret of the requested length', () => {
    expect(generateSecret(4, 10, ALWAYS_FIRST)).toHaveLength(4);
    expect(generateSecret(6, 16, ALWAYS_LAST)).toHaveLength(6);
  });

  it('picks the first remaining digit when random returns 0, allowing a leading zero', () => {
    expect(generateSecret(4, 10, ALWAYS_FIRST)).toBe('0123');
  });

  it('picks the last remaining digit when random is close to 1', () => {
    expect(generateSecret(4, 10, ALWAYS_LAST)).toBe('9876');
  });

  it('removes each picked digit from the remaining ones', () => {
    expect(generateSecret(3, 10, createSequenceRandom([0.5, 0, 0.99]))).toBe('509');
  });

  it('stays within the digits of the base', () => {
    expect(generateSecret(3, 8, ALWAYS_LAST)).toBe('765');
  });

  it('uses lowercase letters for hex digits', () => {
    expect(generateSecret(2, 16, ALWAYS_LAST)).toBe('fe');
  });

  it('uses every digit when the length equals the base', () => {
    expect(generateSecret(2, 2, ALWAYS_FIRST)).toBe('01');
    expect(generateSecret(2, 2, ALWAYS_LAST)).toBe('10');
  });

  it('returns the same secret for the same random sequence', () => {
    const values = [0.1, 0.7, 0.3, 0.9];

    expect(generateSecret(4, 10, createSequenceRandom(values))).toBe(
      generateSecret(4, 10, createSequenceRandom(values)),
    );
  });

  it('falls back to Math.random when no source is passed', () => {
    const mathRandom = vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(generateSecret(4, 10)).toBe('0123');
    expect(mathRandom).toHaveBeenCalledTimes(4);
  });
});
