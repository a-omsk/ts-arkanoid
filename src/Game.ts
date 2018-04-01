import Brick from './Brick';
import Vaus from './Vaus';
import Ball from './Ball';
import Bonus from './Bonus';
import {randomBoolGenerator} from './utils';

const getRandomBool = randomBoolGenerator(10); // 10% possibility of bonus

export default class Game {
    public score: number;
    public level: number;

    private ctx: CanvasRenderingContext2D;
    private bricks: Brick[];
    private bonuses: Bonus[];
    private vaus: Vaus | null;
    private ball: Ball | null;
    private mouseHandler: any;

    private onScoreChanged: Function;
    private onGameFinished: Function;
    private onGameFailed: Function;

    public constructor(ctx: CanvasRenderingContext2D, onScoreChanged: Function, onGameFinished: Function, onGameFailed: Function) {
        this.ctx = ctx;

        this.bricks = [];
        this.bonuses = [];

        this.score = 0;
        this.level = 1;

        this.vaus = null;
        this.ball = null;

        this.mouseHandler = null;
        this.onScoreChanged = onScoreChanged;
        this.onGameFinished = onGameFinished;
        this.onGameFailed = onGameFailed;
    }

    public clear(): void {
        const { canvas } = this.ctx;
        this.bricks = [];
        this.bonuses = [];

        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        const initialColumnPosition = 60;

        const padding = 8;
        const width = 80;
        const heigth = 36;

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

        const dx = Math.floor(Math.random() * this.level + 4);
        const dy = Math.floor(Math.random() * this.level + 4);

        this.ball = new Ball(ballX, ballY, dx, dy, ballRadius, 'black');
        this.ball.draw(this.ctx);
    }

    private bindVausControl(): void {
        const { canvas } = this.ctx;
        const { left } = canvas.getBoundingClientRect();

        this.mouseHandler = (e: MouseEvent) => {
            const newVausPosition = Math.floor(e.clientX - left);

            if (this.vaus) {
                this.vaus.move(newVausPosition, canvas.width);
            }
        };

        canvas.addEventListener('mousemove', this.mouseHandler, { passive: true })

    }

    private unbindVausControl(): void {
        const { canvas } = this.ctx;

        canvas.removeEventListener('mousemove', this.mouseHandler);
    }

    private loop(): void {
        const vaus = <Vaus>this.vaus;
        const ball = <Ball>this.ball;

        const hasBottomBorderIntersection = ball.changeDirectionIfIntersectsBorder(this.ctx);

        if (hasBottomBorderIntersection) {
            this.onGameFailed();
            return;
        }

        const hasVausIntersection = ball.isIntersectsShape(vaus.getBounds());

        if (hasVausIntersection) {
            ball.swapYDirection();
        }

        for (let brickI = 0; brickI < this.bricks.length; brickI++) {
            const brick = this.bricks[brickI];
            const hasBrickIntersection = ball.isIntersectsShape(brick.getBounds());

            if (hasBrickIntersection) {
                ball.swapYDirection();

                brick.clear(this.ctx);

                if (getRandomBool()) {
                    const bonus = new Bonus(
                        brick.x + ( brick.width / 2),
                        brick.y + (brick.height / 2),
                        2,
                        8,
                        'pink'
                    );

                    this.bonuses.push(bonus);
                }

                this.bricks.splice(brickI, 1);
                this.onScoreChanged(++this.score);

                if (!this.bricks.length) {
                    this.unbindVausControl();
                    this.onGameFinished();
                    return;
                }

                break;
            }
        }

        this.drawShapes();

        requestAnimationFrame(() => this.loop());
    }

    private drawShapes(): void {
        const vaus = <Vaus>this.vaus;
        const ball = <Ball>this.ball;

        ball.clear(this.ctx);
        this.bonuses.forEach(bonus => bonus.clear(this.ctx));

        this.bricks.forEach(brick => brick.draw(this.ctx));
        this.bonuses.forEach((bonus, i) => {
            bonus.move();

            if (bonus.isIntersectsShape(vaus.getBounds())) {
                this.score += 10;
                this.onScoreChanged(this.score);
                this.bonuses.splice(i, 1);

                bonus.clear(this.ctx);


            } else {
                bonus.draw(this.ctx);
            }
        })

        ball.move();
        ball.draw(this.ctx);
        vaus.draw(this.ctx);
    }

    public init(): void {
        this.clear();

        this.buildBricks();
        this.buildVaus();
        this.buildBall();
    }

    public start(): void {
        this.score = 0;

        this.onScoreChanged(this.score);
        this.bindVausControl();
        this.loop();
    }
}