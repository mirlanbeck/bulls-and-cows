import type { GameSettings, GameState } from './game-state.js';

export interface HighScore {
  readonly attempts: number;
  readonly timeMs: number;
  readonly settings: GameSettings;
}

export const MAX_HIGH_SCORES = 10;

export const createHighScore = (state: GameState): HighScore | null => {
  throw new Error(`Not implemented: ${state.status}`);
};

export const addHighScore = (
  scores: readonly HighScore[],
  score: HighScore,
  limit: number = MAX_HIGH_SCORES,
): readonly HighScore[] => {
  throw new Error(`Not implemented: ${scores.length}, ${score.attempts}, ${limit}`);
};
