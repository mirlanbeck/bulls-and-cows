import { describe, it, expect } from 'vitest';
import { applyGuess, createGame } from './game-state.js';

const DEC_SETTINGS = { length: 4, base: 10 };
const HEX_SETTINGS = { length: 2, base: 16 };
const STARTED_AT = 1000;
const NOW = 5000;

const createDecGame = () => createGame(DEC_SETTINGS, '1234', STARTED_AT);
const createHexGame = () => createGame(HEX_SETTINGS, 'ab', STARTED_AT);

describe('createGame', () => {
  it('creates a game in progress with an empty history', () => {
    expect(createDecGame()).toEqual({
      settings: DEC_SETTINGS,
      secret: '1234',
      history: [],
      status: 'playing',
      startedAt: STARTED_AT,
      finishedAt: null,
    });
  });
});

describe('applyGuess', () => {
  it('adds an entry with the guess and its result', () => {
    expect(applyGuess(createDecGame(), '1243', NOW).history).toEqual([
      { guess: '1243', bulls: 2, cows: 2 },
    ]);
  });

  it('appends new entries after the existing ones', () => {
    const afterFirst = applyGuess(createDecGame(), '5678', NOW);
    const afterSecond = applyGuess(afterFirst, '1243', NOW);

    expect(afterSecond.history.map((entry) => entry.guess)).toEqual(['5678', '1243']);
  });

  it('keeps the game in progress after a wrong guess', () => {
    const state = applyGuess(createDecGame(), '1243', NOW);

    expect(state.status).toBe('playing');
    expect(state.finishedAt).toBeNull();
  });

  it('returns a new state and a new history array', () => {
    const state = createDecGame();
    const next = applyGuess(state, '1243', NOW);

    expect(next).not.toBe(state);
    expect(next.history).not.toBe(state.history);
  });

  it('does not change the previous state', () => {
    const state = Object.freeze({ ...createDecGame(), history: Object.freeze([]) });

    applyGuess(state, '1243', NOW);

    expect(state.history).toEqual([]);
    expect(state.status).toBe('playing');
  });

  it('reuses the existing history entries', () => {
    const afterFirst = applyGuess(createDecGame(), '5678', NOW);
    const afterSecond = applyGuess(afterFirst, '1243', NOW);

    expect(afterSecond.history[0]).toBe(afterFirst.history[0]);
  });

  it('wins the game when all digits are bulls and records the finish time', () => {
    const state = applyGuess(createDecGame(), '1234', NOW);

    expect(state.status).toBe('won');
    expect(state.finishedAt).toBe(NOW);
  });

  it('ignores a guess that was already made', () => {
    const state = applyGuess(createDecGame(), '1243', NOW);

    expect(applyGuess(state, '1243', NOW)).toBe(state);
  });

  it('ignores an invalid guess', () => {
    const state = createDecGame();

    expect(applyGuess(state, '1123', NOW)).toBe(state);
  });

  it('ignores guesses after the game is won', () => {
    const won = applyGuess(createDecGame(), '1234', NOW);

    expect(applyGuess(won, '5678', NOW)).toBe(won);
  });

  it('stores hex guesses in lowercase', () => {
    expect(applyGuess(createHexGame(), 'CD', NOW).history[0]?.guess).toBe('cd');
  });

  it('treats the same hex guess in another case as already made', () => {
    const state = applyGuess(createHexGame(), 'cd', NOW);

    expect(applyGuess(state, 'CD', NOW)).toBe(state);
  });

  it('wins with an uppercase hex guess', () => {
    expect(applyGuess(createHexGame(), 'AB', NOW).status).toBe('won');
  });
});
