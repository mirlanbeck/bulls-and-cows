import type { GuessResult } from './evaluate-guess.js';

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
): GameState => {
  throw new Error(`Not implemented: ${settings.length}, ${secret}, ${startedAt}`);
};

export const applyGuess = (state: GameState, guess: string, now: number): GameState => {
  throw new Error(`Not implemented: ${state.status}, ${guess}, ${now}`);
};
