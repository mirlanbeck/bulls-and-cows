export const MAX_HIGH_SCORES = 10;
export const createHighScore = (state) => {
    if (state.status !== 'won' || state.finishedAt === null) {
        return null;
    }
    return {
        attempts: state.history.length,
        timeMs: state.finishedAt - state.startedAt,
        settings: state.settings,
    };
};
const compareHighScores = (first, second) => first.attempts - second.attempts || first.timeMs - second.timeMs;
export const addHighScore = (scores, score, limit = MAX_HIGH_SCORES) => [...scores, score].sort(compareHighScores).slice(0, limit);
//# sourceMappingURL=high-scores.js.map