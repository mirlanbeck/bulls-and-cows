import { describe, it, expect } from 'vitest';
import { HIGH_SCORES_KEY, loadHighScores, saveHighScores } from './high-score-storage.js';
import type { ScoreStorage } from './high-score-storage.js';

const SCORE = { attempts: 5, timeMs: 1000, settings: { length: 4, base: 10 } };

const createFakeStorage = (initial: Readonly<Record<string, string>> = {}): ScoreStorage => {
  const values = new Map(Object.entries(initial));

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
  };
};

const createBrokenStorage = (): ScoreStorage => ({
  getItem: () => {
    throw new Error('Storage is unavailable');
  },
  setItem: () => {
    throw new Error('Storage is unavailable');
  },
});

describe('loadHighScores', () => {
  it('returns an empty table when nothing is stored', () => {
    expect(loadHighScores(createFakeStorage())).toEqual([]);
  });

  it('returns an empty table for corrupted JSON', () => {
    expect(loadHighScores(createFakeStorage({ [HIGH_SCORES_KEY]: '{oops' }))).toEqual([]);
  });

  it('returns an empty table when the stored value is not an array', () => {
    expect(loadHighScores(createFakeStorage({ [HIGH_SCORES_KEY]: '{"attempts":1}' }))).toEqual([]);
  });

  it('skips malformed entries and keeps valid ones', () => {
    const stored = JSON.stringify([SCORE, { attempts: 'many' }, null]);

    expect(loadHighScores(createFakeStorage({ [HIGH_SCORES_KEY]: stored }))).toEqual([SCORE]);
  });

  it('returns an empty table when storage is unavailable', () => {
    expect(loadHighScores(createBrokenStorage())).toEqual([]);
  });
});

describe('saveHighScores', () => {
  it('stores scores so they can be loaded again', () => {
    const storage = createFakeStorage();

    saveHighScores(storage, [SCORE]);

    expect(loadHighScores(storage)).toEqual([SCORE]);
  });

  it('writes the scores under the high scores key', () => {
    const storage = createFakeStorage();

    saveHighScores(storage, [SCORE]);

    expect(storage.getItem(HIGH_SCORES_KEY)).toBe(JSON.stringify([SCORE]));
  });

  it('does not throw when storage is unavailable', () => {
    expect(() => saveHighScores(createBrokenStorage(), [SCORE])).not.toThrow();
  });
});
