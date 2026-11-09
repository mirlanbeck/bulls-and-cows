import { memoize } from './memoize.js';
export const countPossibleSecrets = memoize((length, base) => {
    if (length > base) {
        return 0;
    }
    if (length === 0) {
        return 1;
    }
    return base * countPossibleSecrets(length - 1, base - 1);
});
//# sourceMappingURL=count-possible-secrets.js.map