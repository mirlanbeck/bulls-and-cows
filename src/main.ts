import type { GameSettings } from './core/game-state.js';
import { createElement } from './ui/create-element.js';
import { createGameScreen } from './ui/game-screen.js';
import { createSettingsScreen } from './ui/settings-screen.js';

const root = createElement('main', { className: 'app' });

const showSettings = (): void => {
  root.replaceChildren(createSettingsScreen(showGame));
};

const showGame = (settings: GameSettings): void => {
  root.replaceChildren(
    createGameScreen({ settings, onWin: () => undefined, onNewGame: showSettings }),
  );
};

document.body.append(root);
showSettings();
