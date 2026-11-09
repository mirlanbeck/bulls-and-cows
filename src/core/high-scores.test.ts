import { describe, it, expect } from 'vitest';
import { applyGuess, createGame } from './game-state.js';
import { MAX_HIGH_SCORES, addHighScore, createHighScore } from './high-scores.js';

const SETTINGS = { length: 4, base: 10 };

const createScore = (attempts: number, timeMs: number) => ({
  attempts,
  timeMs,
  settings: SETTINGS,
});

describe('createHighScore', () => {
  it('builds a score from a won game', () => {
    const game = createGame(SETTINGS, '1234', 1000);
    const afterMiss = applyGuess(game, '5678', 2000);
    const won = applyGuess(afterMiss, '1234', 5000);

    expect(createHighScore(won)).toEqual({ attempts: 2, timeMs: 4000, settings: SETTINGS });
  });

  it('returns null for a game in progress', () => {
    expect(createHighScore(createGame(SETTINGS, '1234', 1000))).toBeNull();
  });
});

describe('addHighScore', () => {
  it('adds a score to an empty table', () => {
    const score = createScore(5, 1000);

    expect(addHighScore([], score)).toEqual([score]);
  });

  it('puts a score with fewer attempts first', () => {
    const worse = createScore(8, 1000);
    const better = createScore(3, 9000);

    expect(addHighScore([worse], better)).toEqual([better, worse]);
  });

  it('breaks an attempts tie by time', () => {
    const slower = createScore(5, 9000);
    const faster = createScore(5, 1000);

    expect(addHighScore([slower], faster)).toEqual([faster, slower]);
  });

  it('keeps the older score first when attempts and time are equal', () => {
    const older = createScore(5, 1000);
    const newer = createScore(5, 1000);

    const table = addHighScore([older], newer);

    expect(table[0]).toBe(older);
    expect(table[1]).toBe(newer);
  });

  it('drops the worst score when the table exceeds the limit', () => {
    const first = createScore(1, 1000);
    const second = createScore(2, 1000);
    const third = createScore(3, 1000);

    expect(addHighScore([first, third], second, 2)).toEqual([first, second]);
  });

  it('does not add a score that is worse than a full table', () => {
    const first = createScore(1, 1000);
    const second = createScore(2, 1000);

    expect(addHighScore([first, second], createScore(9, 1000), 2)).toEqual([first, second]);
  });

  it('limits the table to MAX_HIGH_SCORES by default', () => {
    const fullTable = Array.from({ length: MAX_HIGH_SCORES }, (_, index) =>
      createScore(index + 1, 1000),
    );

    expect(addHighScore(fullTable, createScore(1, 500))).toHaveLength(MAX_HIGH_SCORES);
  });

  it('returns a new array and leaves the original unchanged', () => {
    const scores = Object.freeze([createScore(8, 1000)]);

    const table = addHighScore(scores, createScore(3, 1000));

    expect(table).not.toBe(scores);
    expect(scores).toEqual([createScore(8, 1000)]);
  });
});
