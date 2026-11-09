import { evaluateGuess } from './evaluate-guess.js';
import { isValidGuess } from './is-valid-guess.js';
export const createGame = (settings, secret, startedAt) => ({
    settings,
    secret,
    history: [],
    status: 'playing',
    startedAt,
    finishedAt: null,
});
const canAcceptGuess = (state, guess) => state.status === 'playing' &&
    isValidGuess(guess, state.settings.length, state.settings.base) &&
    !state.history.some((entry) => entry.guess === guess);
export const applyGuess = (state, guess, now) => {
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
//# sourceMappingURL=game-state.js.map