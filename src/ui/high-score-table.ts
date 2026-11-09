import type { HighScore } from '../core/high-scores.js';
import { createElement } from './create-element.js';
import { formatTime } from './format-time.js';

const COLUMN_TITLES = ['#', 'Attempts', 'Time', 'Settings'];

const BASE_NAMES: Readonly<Record<number, string>> = {
  2: 'bin',
  8: 'oct',
  10: 'dec',
  16: 'hex',
};

const createCell = (text: string): HTMLTableCellElement => createElement('td', { text });

const createSettingsBadge = ({ settings }: HighScore): HTMLTableCellElement =>
  createElement('td', {
    children: [
      createElement('span', {
        className: 'badge',
        text: `${BASE_NAMES[settings.base] ?? settings.base} · ${settings.length}`,
      }),
    ],
  });

const createRow = (score: HighScore, index: number): HTMLTableRowElement =>
  createElement('tr', {
    children: [
      createCell(String(index + 1)),
      createCell(String(score.attempts)),
      createCell(formatTime(score.timeMs)),
      createSettingsBadge(score),
    ],
  });

const createTable = (scores: readonly HighScore[]): HTMLTableElement =>
  createElement('table', {
    children: [
      createElement('thead', {
        children: [
          createElement('tr', {
            children: COLUMN_TITLES.map((text) =>
              createElement('th', { text, attributes: { scope: 'col' } }),
            ),
          }),
        ],
      }),
      createElement('tbody', { children: scores.map(createRow) }),
    ],
  });

export const createHighScoreTable = (scores: readonly HighScore[]): HTMLElement =>
  createElement('section', {
    className: 'screen',
    children: [
      createElement('h2', { text: 'High scores' }),
      scores.length === 0
        ? createElement('p', { className: 'hint', text: 'No high scores yet' })
        : createTable(scores),
    ],
  });
