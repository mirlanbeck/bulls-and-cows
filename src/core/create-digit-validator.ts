export const DIGITS = '0123456789abcdef';

export const createDigitValidator = (base: number): ((char: string) => boolean) => {
  const allowedDigits = new Set(DIGITS.slice(0, base));

  return (char) => allowedDigits.has(char.toLowerCase());
};
