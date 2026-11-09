import { createDigitValidator } from './create-digit-validator.js';
export const isValidGuess = (guess, length, base) => {
    const digits = [...guess.toLowerCase()];
    return (digits.length === length &&
        digits.every(createDigitValidator(base)) &&
        new Set(digits).size === length);
};
//# sourceMappingURL=is-valid-guess.js.map