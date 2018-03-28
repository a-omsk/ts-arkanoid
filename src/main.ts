import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = <HTMLCanvasElement> document.querySelector('.canvas');

    if (!canvas) {
        return;
    }

    const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

    canvas.width = 640;
    canvas.height = 480;

    const game = new Game(ctx);

    game.init();

    const playButton = <HTMLElement>document.querySelector('.game-controls .play');

    playButton.addEventListener('click', () => {
        const canvasContainer = <HTMLElement>document.querySelector('.canvas-container');
        canvasContainer.classList.add('playing');

        game.start();
    });
});
