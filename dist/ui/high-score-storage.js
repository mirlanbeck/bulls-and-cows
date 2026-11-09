export const HIGH_SCORES_KEY = 'bulls-and-cows:high-scores';
const isRecord = (value) => typeof value === 'object' && value !== null;
const isGameSettings = (value) => isRecord(value) && typeof value.length === 'number' && typeof value.base === 'number';
const isHighScore = (value) => isRecord(value) &&
    typeof value.attempts === 'number' &&
    typeof value.timeMs === 'number' &&
    isGameSettings(value.settings);
export const loadHighScores = (storage) => {
    try {
        const parsed = JSON.parse(storage.getItem(HIGH_SCORES_KEY) ?? '[]');
        return Array.isArray(parsed) ? parsed.filter(isHighScore) : [];
    }
    catch {
        return [];
    }
};
export const saveHighScores = (storage, scores) => {
    try {
        storage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
    }
    catch {
        // Records are optional: a failed write must not interrupt the game.
    }
};
//# sourceMappingURL=high-score-storage.js.map