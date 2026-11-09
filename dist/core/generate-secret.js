import { DIGITS } from './create-digit-validator.js';
const pickDigits = (available, count, random) => {
    if (count === 0) {
        return '';
    }
    const index = Math.floor(random() * available.length);
    const remaining = available.slice(0, index) + available.slice(index + 1);
    return available.charAt(index) + pickDigits(remaining, count - 1, random);
};
export const generateSecret = (length, base, random = Math.random) => pickDigits(DIGITS.slice(0, base), length, random);
//# sourceMappingURL=generate-secret.js.map