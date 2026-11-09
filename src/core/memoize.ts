export const memoize = <Args extends readonly (string | number)[], Result>(
  fn: (...args: Args) => Result,
): ((...args: Args) => Result) => {
  throw new Error(`Not implemented: memoize ${fn.name}`);
};
