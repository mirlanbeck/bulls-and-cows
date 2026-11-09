import { countPossibleSecrets } from '../core/count-possible-secrets.js';
import { getAvailableLengths } from '../core/game-options.js';
import { createElement } from './create-element.js';
const BASE_OPTIONS = [
    { value: 2, label: 'Binary (bin)' },
    { value: 8, label: 'Octal (oct)' },
    { value: 10, label: 'Decimal (dec)' },
    { value: 16, label: 'Hexadecimal (hex)' },
];
const DEFAULT_SETTINGS = { length: 4, base: 10 };
const createOption = (value, label) => createElement('option', { text: label, attributes: { value: String(value) } });
const createField = (label, control) => createElement('label', { className: 'field', text: label, children: [control] });
const fillLengthSelect = (select, base, preferredLength) => {
    select.replaceChildren(...getAvailableLengths(base).map((length) => createOption(length, String(length))));
    select.value = String(Math.min(preferredLength, base));
};
export const createSettingsScreen = (onStart) => {
    const baseSelect = createElement('select', {
        attributes: { name: 'base' },
        children: BASE_OPTIONS.map(({ value, label }) => createOption(value, label)),
    });
    const lengthSelect = createElement('select', { attributes: { name: 'length' } });
    const secretsInfo = createElement('p', { className: 'hint' });
    const readSettings = () => ({
        length: Number(lengthSelect.value),
        base: Number(baseSelect.value),
    });
    const updateSecretsInfo = () => {
        const { length, base } = readSettings();
        secretsInfo.textContent = `Possible secrets: ${countPossibleSecrets(length, base)}`;
    };
    const applyBase = (preferredLength) => {
        fillLengthSelect(lengthSelect, Number(baseSelect.value), preferredLength);
        updateSecretsInfo();
    };
    baseSelect.value = String(DEFAULT_SETTINGS.base);
    applyBase(DEFAULT_SETTINGS.length);
    baseSelect.addEventListener('change', () => applyBase(Number(lengthSelect.value)));
    lengthSelect.addEventListener('change', updateSecretsInfo);
    const form = createElement('form', {
        className: 'form',
        children: [
            createField('Number system', baseSelect),
            createField('Secret length', lengthSelect),
            secretsInfo,
            createElement('button', { text: 'Start game', attributes: { type: 'submit' } }),
        ],
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        onStart(readSettings());
    });
    return createElement('section', {
        className: 'screen',
        children: [createElement('h1', { text: 'Bulls and Cows' }), form],
    });
};
//# sourceMappingURL=settings-screen.js.map