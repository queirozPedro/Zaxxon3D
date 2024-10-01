import Game from './Game.js';

const game = new Game();

window.addEventListener('keydown', (event) => {
    game.handleKeyDown(event);
});
