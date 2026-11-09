import { createElement } from './create-element.js';
import { formatTime } from './format-time.js';
const COLUMN_TITLES = ['#', 'Попытки', 'Время', 'Настройки'];
const BASE_NAMES = {
    2: 'bin',
    8: 'oct',
    10: 'dec',
    16: 'hex',
};
const createCell = (text) => createElement('td', { text });
const createSettingsBadge = ({ settings }) => createElement('td', {
    children: [
        createElement('span', {
            className: 'badge',
            text: `${BASE_NAMES[settings.base] ?? settings.base} · ${settings.length}`,
        }),
    ],
});
const createRow = (score, index) => createElement('tr', {
    children: [
        createCell(String(index + 1)),
        createCell(String(score.attempts)),
        createCell(formatTime(score.timeMs)),
        createSettingsBadge(score),
    ],
});
const createTable = (scores) => createElement('table', {
    children: [
        createElement('thead', {
            children: [
                createElement('tr', {
                    children: COLUMN_TITLES.map((text) => createElement('th', { text, attributes: { scope: 'col' } })),
                }),
            ],
        }),
        createElement('tbody', { children: scores.map(createRow) }),
    ],
});
export const createHighScoreTable = (scores) => createElement('section', {
    className: 'screen',
    children: [
        createElement('h2', { text: 'Рекорды' }),
        scores.length === 0
            ? createElement('p', { className: 'hint', text: 'Рекордов пока нет' })
            : createTable(scores),
    ],
});
//# sourceMappingURL=high-score-table.js.map