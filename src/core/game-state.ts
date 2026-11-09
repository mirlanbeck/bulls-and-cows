import { evaluateGuess } from './evaluate-guess.js';
import type { GuessResult } from './evaluate-guess.js';
import { isValidGuess } from './is-valid-guess.js';

export interface GameSettings {
  readonly length: number;
  readonly base: number;
}

export interface HistoryEntry extends GuessResult {
  readonly guess: string;
}

export type GameStatus = 'playing' | 'won';

export interface GameState {
  readonly settings: GameSettings;
  readonly secret: string;
  readonly history: readonly HistoryEntry[];
  readonly status: GameStatus;
  readonly startedAt: number;
  readonly finishedAt: number | null;
}

export const createGame = (
  settings: GameSettings,
  secret: string,
  startedAt: number,
): GameState => ({
  settings,
  secret,
  history: [],
  status: 'playing',
  startedAt,
  finishedAt: null,
});

const canAcceptGuess = (state: GameState, guess: string): boolean =>
  state.status === 'playing' &&
  isValidGuess(guess, state.settings.length, state.settings.base) &&
  !state.history.some((entry) => entry.guess === guess);

export const applyGuess = (state: GameState, guess: string, now: number): GameState => {
  const normalizedGuess = guess.toLowerCase();

  if (!canAcceptGuess(state, normalizedGuess)) {
    return state;
  }

  const result = evaluateGuess(state.secret, normalizedGuess);
  const isWon = result.bulls === state.settings.length;

  return {
    ...state,
    history: [...state.history, { guess: normalizedGuess, ...result }],
    status: isWon ? 'won' : 'playing',
    finishedAt: isWon ? now : null,
  };
};
