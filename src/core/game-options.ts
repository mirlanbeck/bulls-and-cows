const MIN_SECRET_LENGTH = 2;
const MAX_SECRET_LENGTH = 6;

export const getAvailableLengths = (base: number): readonly number[] =>
  Array.from(
    { length: MAX_SECRET_LENGTH - MIN_SECRET_LENGTH + 1 },
    (_, index) => MIN_SECRET_LENGTH + index,
  ).filter((length) => length <= base);
