import Brick from './Brick';
import Vaus from './Vaus';
import Ball from './Ball';

export default class Game {
    public score: number;
    private ctx: CanvasRenderingContext2D;
    private bricks: Brick[];
    private vaus: Vaus | null;
    private ball: Ball | null;

    public constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.bricks = [];
        this.score = 0;

        this.vaus = null;
        this.ball = null;
    }

    private buildVaus(): void {
        const vausWidth = 120;
        const vausHeight = 30;

        const vausX = Math.floor(this.ctx.canvas.clientWidth / 2) - (vausWidth / 2);
        const vausY = this.ctx.canvas.clientHeight - vausHeight - 10;

        this.vaus = new Vaus(vausX, vausY, vausWidth, vausHeight, 'green');

        this.vaus.draw(this.ctx);
    }

    private buildBricks(): void {
        let currentColor = 'blue';
        const initialColumnPosition = 70;

        const padding = 2;
        const width = 80;
        const heigth = 40;

        let rowY = 40;

        for (let i = 0; i < 36; i += 6) {
            let columnX = initialColumnPosition;

            for (let brickI = i; brickI < i + 6; brickI++) {
                const brick = new Brick(columnX, rowY, width, heigth, currentColor);
                this.bricks.push(brick);

                brick.draw(this.ctx);

                columnX += width + padding
            }

            rowY += heigth + padding;
            currentColor = currentColor === 'blue' ? 'red' : 'blue';
        }
    }

    private buildBall(): void {
        const ballRadius = 12;

        const ballX = Math.floor(this.ctx.canvas.clientWidth / 2) - ballRadius;
        const ballY = this.ctx.canvas.clientHeight - (ballRadius * 2) - 80;

        const dx = Math.floor(Math.random() * 4 + 4);
        const dy = Math.floor(Math.random() * 4 + 4);

        this.ball = new Ball(ballX, ballY, dx, dy, ballRadius, 'black');
        this.ball.draw(this.ctx);
    }

    private bindVausControl(): void {
        const { canvas } = this.ctx;
        const { left } = canvas.getBoundingClientRect();

        canvas.addEventListener('mousemove', e => {
            const newVausPosition = e.clientX - left;

            if (this.vaus) {
                this.vaus.move(newVausPosition, canvas.width);
            }
        }, { passive: true })

    }

    private loop() {
        if (this.vaus) {
            this.vaus.draw(this.ctx);
        }

        if (this.ball) {
            this.ball.changeDirectionIfIntersectsBorder(this.ctx);

            this.ball.clear(this.ctx);
            this.ball.move();
            this.ball.draw(this.ctx);
        }

        requestAnimationFrame(() => this.loop());
    }

    public start(): void {
        this.score = 0;

        this.buildBricks();
        this.buildVaus();
        this.buildBall();

        this.bindVausControl();

        const playButton = <HTMLElement>document.querySelector('.game-controls .play');

        playButton.addEventListener('click', () => {
            const canvasContainer = <HTMLElement>document.querySelector('.canvas-container');
            canvasContainer.classList.add('playing');

            this.loop();
        });
    }
}