import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = <HTMLCanvasElement>document.querySelector('.canvas');

    if (!canvas) {
        return;
    }

    const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

    canvas.width = 640;
    canvas.height = 480;

    const canvasContainer = <HTMLElement>document.querySelector('.canvas-container');

    const game = new Game(
        ctx,
        function onScoreChanged(score: number) {
            const scoreCounter = <HTMLElement>document.querySelector('.game-score > .counter');
            scoreCounter.innerText = score.toString();
        },
        function onGameFinished() {
            game.init();

            canvasContainer.classList.remove('failed');
            canvasContainer.classList.remove('playing');
        },
        function onGameFailed() {
            canvasContainer.classList.remove('playing');
            canvasContainer.classList.add('failed');
        });

    game.init();

    const playButton = <HTMLElement>document.querySelector('.game-controls .play');
    const repeatButton = <HTMLElement>document.querySelector('.game-controls .repeat');

    playButton.addEventListener('click', () => {
        canvasContainer.classList.add('playing');

        game.start();
    });

    repeatButton.addEventListener('click', () => {
        canvasContainer.classList.add('playing');

        game.init();
        game.start();
    });
});
