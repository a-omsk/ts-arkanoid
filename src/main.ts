import Game from './Game';
import levelBrickSets from './levelBrickSets';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = <HTMLCanvasElement>document.querySelector('.canvas');

    if (!canvas) {
        return;
    }

    canvas.width = 640;
    canvas.height = 480;

    const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    const canvasContainer = <HTMLElement>document.querySelector('.canvas-container');
    const scoreCounter = <HTMLElement>document.querySelector('.congratulations .score');
    const currentLevel = <HTMLElement>document.querySelector('.game-level > .level');
    const playButton = <HTMLElement>document.querySelector('.game-controls .play');
    const repeatButton = <HTMLElement>document.querySelector('.game-controls .repeat');

    const game = new Game(
        ctx,
        levelBrickSets,
        function onScoreChanged(score: number) {
            scoreCounter.innerText = score.toString();
        },
        function onLevelFinished() {
            game.init();
            canvasContainer.classList.remove('playing');

            currentLevel.innerText = game.level.toString();
        },
        function onGameFinished() {
            scoreCounter.innerText = game.score.toString();

            canvasContainer.classList.remove('playing');
            canvasContainer.classList.add('finished');
        },
        function onGameFailed() {
            canvasContainer.classList.remove('playing');
            canvasContainer.classList.add('failed');
            game.resetLevels();
            game.resetScore();

            currentLevel.innerText = game.level.toString();
        });

    game.init();

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
