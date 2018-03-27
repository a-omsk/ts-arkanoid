import Brick from './Brick';

export default class Game {
    public score: number;
    private ctx: CanvasRenderingContext2D;
    private bricks: Brick[];

    public constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.bricks = [];
        this.score = 0;
    }

    private buildBricks() {
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

    public start(): void {
        this.score = 0;
        this.buildBricks();
    }
}