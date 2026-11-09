export const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = args.join(':');
        const cached = cache.get(key);
        if (cached !== undefined) {
            return cached;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};
//# sourceMappingURL=memoize.js.map