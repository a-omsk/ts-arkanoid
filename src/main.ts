import Game from './Game';
import levelBrickSets from './levelBrickSets';

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
        levelBrickSets,
        function onScoreChanged(score: number) {
            const scoreCounter = <HTMLElement>document.querySelector('.game-score > .counter');
            scoreCounter.innerText = score.toString();
        },
        function onLevelFinished() {
            game.init();
            canvasContainer.classList.remove('playing');

            const currentLevel = <HTMLElement>document.querySelector('.game-level > .level');

            currentLevel.innerText = game.level.toString();
        },
        function onGameFinished() {
            const scoreCounter = <HTMLElement>document.querySelector('.congratulations .score');
            scoreCounter.innerText = game.score.toString();

            canvasContainer.classList.remove('playing');
            canvasContainer.classList.add('finished');
        },
        function onGameFailed() {
            canvasContainer.classList.remove('playing');
            canvasContainer.classList.add('failed');
            game.resetLevels();
            game.resetScore();
        });

    game.init();

    const playButton = <HTMLElement>document.querySelector('.game-controls .play');
    const repeatButton = <HTMLElement>document.querySelector('.game-controls .repeat');

    playButton.addEventListener('click', () => {
        canvasContainer.classList.add('playing');

        game.start();
    });

    repeatButton.addEventListener('click', () => {
        canvasContainer.classList.remove('failed');
        canvasContainer.classList.add('playing');

        game.init();
        game.start();
    });
});
