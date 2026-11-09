import { createDigitValidator } from '../core/create-digit-validator.js';
import { applyGuess, createGame } from '../core/game-state.js';
import type { GameSettings, HistoryEntry } from '../core/game-state.js';
import { generateSecret } from '../core/generate-secret.js';
import { createHighScore } from '../core/high-scores.js';
import type { HighScore } from '../core/high-scores.js';
import { isValidGuess } from '../core/is-valid-guess.js';
import { createElement } from './create-element.js';
import { formatTime } from './format-time.js';

interface GameScreenOptions {
  readonly settings: GameSettings;
  readonly onWin: (score: HighScore) => void;
  readonly onNewGame: () => void;
}

const createHistoryItem = ({ guess, bulls, cows }: HistoryEntry): HTMLLIElement =>
  createElement('li', { text: `${guess} — bulls: ${bulls}, cows: ${cows}` });

export const createGameScreen = ({
  settings,
  onWin,
  onNewGame,
}: GameScreenOptions): HTMLElement => {
  const { length, base } = settings;
  const isDigit = createDigitValidator(base);
  let state = createGame(settings, generateSecret(length, base), Date.now());

  const input = createElement('input', {
    attributes: {
      type: 'text',
      name: 'guess',
      maxlength: String(length),
      autocomplete: 'off',
      'aria-label': 'Your guess',
    },
  });
  const guessButton = createElement('button', {
    text: 'Check',
    attributes: { type: 'submit' },
  });
  const message = createElement('p', { className: 'hint', attributes: { role: 'status' } });
  const history = createElement('ol', { className: 'history' });
  const newGameButton = createElement('button', {
    text: 'New game',
    attributes: { type: 'button' },
  });

  const finishGame = (score: HighScore): void => {
    input.disabled = true;
    guessButton.disabled = true;
    message.textContent = `You won! Attempts: ${score.attempts}, time: ${formatTime(score.timeMs)}`;
    onWin(score);
  };

  const submitGuess = (): void => {
    const next = applyGuess(state, input.value, Date.now());

    if (next === state) {
      message.textContent = isValidGuess(input.value, length, base)
        ? 'You have already tried this guess'
        : `Enter ${length} different digits`;
      return;
    }

    state = next;
    input.value = '';
    message.textContent = '';
    history.replaceChildren(...state.history.map(createHistoryItem));

    const score = createHighScore(state);

    if (score !== null) {
      finishGame(score);
    }
  };

  input.addEventListener('input', () => {
    input.value = [...input.value].filter(isDigit).join('');
  });
  newGameButton.addEventListener('click', onNewGame);

  const form = createElement('form', { className: 'form', children: [input, guessButton] });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitGuess();
    input.focus();
  });

  return createElement('section', {
    className: 'screen',
    children: [
      createElement('header', {
        className: 'screen-header',
        children: [createElement('h1', { text: 'Bulls and Cows' }), newGameButton],
      }),
      createElement('p', {
        className: 'hint',
        text: `Base: ${base}, secret length: ${length}`,
      }),
      form,
      message,
      history,
    ],
  });
};
