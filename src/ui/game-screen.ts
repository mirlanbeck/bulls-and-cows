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
  createElement('li', { text: `${guess} — быки: ${bulls}, коровы: ${cows}` });

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
      'aria-label': 'Ваша догадка',
    },
  });
  const guessButton = createElement('button', {
    text: 'Проверить',
    attributes: { type: 'submit' },
  });
  const message = createElement('p', { className: 'hint', attributes: { role: 'status' } });
  const history = createElement('ol', { className: 'history' });
  const newGameButton = createElement('button', {
    text: 'Новая игра',
    attributes: { type: 'button' },
  });

  const finishGame = (score: HighScore): void => {
    input.disabled = true;
    guessButton.disabled = true;
    message.textContent = `Победа! Попыток: ${score.attempts}, время: ${formatTime(score.timeMs)}`;
    onWin(score);
  };

  const submitGuess = (): void => {
    const next = applyGuess(state, input.value, Date.now());

    if (next === state) {
      message.textContent = isValidGuess(input.value, length, base)
        ? 'Такая догадка уже была'
        : `Нужно ввести ${length} разных цифр`;
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
        children: [createElement('h1', { text: 'Быки и коровы' }), newGameButton],
      }),
      createElement('p', {
        className: 'hint',
        text: `Основание: ${base}, длина секрета: ${length}`,
      }),
      form,
      message,
      history,
    ],
  });
};
