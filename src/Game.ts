import Brick from './Brick';
import Vaus from './Vaus';

export default class Game {
    public score: number;
    private ctx: CanvasRenderingContext2D;
    private bricks: Brick[];
    private vaus: Vaus | null;

    public constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.bricks = [];
        this.score = 0;

        this.vaus = null;
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

    private bindVausControl() {
        const { canvas } = this.ctx;
        const {left} = canvas.getBoundingClientRect();

        canvas.addEventListener('mousemove', e => {
            const newVausPosition = e.clientX - left;

            if (this.vaus) {
                this.vaus.move(newVausPosition, canvas.width);

                // todo: delete this
                this.vaus.draw(this.ctx);
            }
        }, {passive: true})

    }

    public start(): void {
        this.score = 0;

        this.buildBricks();
        this.buildVaus();

        this.bindVausControl();
    }
}