import type { HighScore } from '../core/high-scores.js';

export type ScoreStorage = Pick<Storage, 'getItem' | 'setItem'>;

export const HIGH_SCORES_KEY = 'bulls-and-cows:high-scores';

export const loadHighScores = (storage: ScoreStorage): readonly HighScore[] => {
  throw new Error(`Not implemented: ${typeof storage}`);
};

export const saveHighScores = (storage: ScoreStorage, scores: readonly HighScore[]): void => {
  throw new Error(`Not implemented: ${typeof storage}, ${scores.length}`);
};
