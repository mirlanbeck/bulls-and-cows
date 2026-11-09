import { describe, it, expect, vi } from 'vitest';
import { memoize } from './memoize.js';

describe('memoize', () => {
  it('returns the result of the wrapped function', () => {
    const sum = memoize((a: number, b: number) => a + b);

    expect(sum(2, 3)).toBe(5);
  });

  it('calls the wrapped function once for repeated arguments', () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn);

    memoized(2, 3);
    memoized(2, 3);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls the wrapped function again for different arguments', () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn);

    memoized(2, 3);
    memoized(3, 2);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('does not mix up arguments that look alike when joined', () => {
    const fn = vi.fn((a: number, b: number) => a * 100 + b);
    const memoized = memoize(fn);

    expect(memoized(1, 23)).toBe(123);
    expect(memoized(12, 3)).toBe(1203);
  });

  it('caches falsy results', () => {
    const fn = vi.fn((a: number) => a * 0);
    const memoized = memoize(fn);

    memoized(5);
    memoized(5);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('keeps a separate cache for each memoized function', () => {
    const double = memoize((a: number) => a * 2);
    const triple = memoize((a: number) => a * 3);

    expect(double(2)).toBe(4);
    expect(triple(2)).toBe(6);
  });
});
