export const DIGITS = '0123456789abcdef';
export const createDigitValidator = (base) => {
    const allowedDigits = new Set(DIGITS.slice(0, base));
    return (char) => allowedDigits.has(char.toLowerCase());
};
//# sourceMappingURL=create-digit-validator.js.map