import type { GameSettings, GameState } from './game-state.js';

export interface HighScore {
  readonly attempts: number;
  readonly timeMs: number;
  readonly settings: GameSettings;
}

export const MAX_HIGH_SCORES = 10;

export const createHighScore = (state: GameState): HighScore | null => {
  if (state.status !== 'won' || state.finishedAt === null) {
    return null;
  }

  return {
    attempts: state.history.length,
    timeMs: state.finishedAt - state.startedAt,
    settings: state.settings,
  };
};

const compareHighScores = (first: HighScore, second: HighScore): number =>
  first.attempts - second.attempts || first.timeMs - second.timeMs;

export const addHighScore = (
  scores: readonly HighScore[],
  score: HighScore,
  limit: number = MAX_HIGH_SCORES,
): readonly HighScore[] => [...scores, score].sort(compareHighScores).slice(0, limit);
