import { createElement } from './ui/create-element.js';
import { createSettingsScreen } from './ui/settings-screen.js';

const root = createElement('main', { className: 'app' });

document.body.append(root);
root.replaceChildren(createSettingsScreen(() => undefined));
