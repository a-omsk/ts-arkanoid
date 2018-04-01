import CanvasShape, { CanvasShapeBounds } from './CanvasShape';

export default class Vaus extends CanvasShape {
    public width: number;
    public height: number;

    public color: string;

    public newX: number | null;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        super(x, y);

        this.newX = null;

        this.width = width;
        this.height = height;

        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.newX !== null && this.newX !== this.x) {
            this.clear(ctx);

            this.x = this.newX;
            this.newX = null;
        }

        ctx.save();

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    }

    clear(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    move(x: number, maxWidth: number): void {
        const halfVausWidth = Math.floor(this.width / 2);
        const newX = x - halfVausWidth;

        if (newX < 0) {
            this.newX = 0;
        } else if (x + halfVausWidth > maxWidth) {
            this.newX = maxWidth - this.width;
        } else {
            this.newX = newX;
        }
    }

    getBounds(): CanvasShapeBounds {
        return {
            x1: this.x,
            y1: this.y,
            x2: this.x + this.width,
            y2: this.y + this.height,
        }
    }
}