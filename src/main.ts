import type { GameSettings } from './core/game-state.js';
import { addHighScore } from './core/high-scores.js';
import type { HighScore } from './core/high-scores.js';
import { createElement } from './ui/create-element.js';
import { createGameScreen } from './ui/game-screen.js';
import { loadHighScores, saveHighScores } from './ui/high-score-storage.js';
import type { ScoreStorage } from './ui/high-score-storage.js';
import { createHighScoreTable } from './ui/high-score-table.js';
import { createSettingsScreen } from './ui/settings-screen.js';

// localStorage is read inside the methods: merely accessing it can throw when storage is blocked.
const storage: ScoreStorage = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },
};

const root = createElement('main', { className: 'app' });

const recordScore = (score: HighScore): void => {
  saveHighScores(storage, addHighScore(loadHighScores(storage), score));
};

const showSettings = (): void => {
  root.replaceChildren(
    createSettingsScreen(showGame),
    createHighScoreTable(loadHighScores(storage)),
  );
};

const showGame = (settings: GameSettings): void => {
  root.replaceChildren(createGameScreen({ settings, onWin: recordScore, onNewGame: showSettings }));
};

document.body.append(root);
showSettings();
