import type { GameSettings } from '../core/game-state.js';
import type { HighScore } from '../core/high-scores.js';

export type ScoreStorage = Pick<Storage, 'getItem' | 'setItem'>;

export const HIGH_SCORES_KEY = 'bulls-and-cows:high-scores';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isGameSettings = (value: unknown): value is GameSettings =>
  isRecord(value) && typeof value.length === 'number' && typeof value.base === 'number';

const isHighScore = (value: unknown): value is HighScore =>
  isRecord(value) &&
  typeof value.attempts === 'number' &&
  typeof value.timeMs === 'number' &&
  isGameSettings(value.settings);

export const loadHighScores = (storage: ScoreStorage): readonly HighScore[] => {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(HIGH_SCORES_KEY) ?? '[]');

    return Array.isArray(parsed) ? parsed.filter(isHighScore) : [];
  } catch {
    return [];
  }
};

export const saveHighScores = (storage: ScoreStorage, scores: readonly HighScore[]): void => {
  try {
    storage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
  } catch {
    // Records are optional: a failed write must not interrupt the game.
  }
};
