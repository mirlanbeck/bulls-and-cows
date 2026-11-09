import { DIGITS } from './create-digit-validator.js';

const pickDigits = (available: string, count: number, random: () => number): string => {
  if (count === 0) {
    return '';
  }

  const index = Math.floor(random() * available.length);
  const remaining = available.slice(0, index) + available.slice(index + 1);

  return available.charAt(index) + pickDigits(remaining, count - 1, random);
};

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => pickDigits(DIGITS.slice(0, base), length, random);
