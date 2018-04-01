import CanvasShape, { CanvasShapeBounds } from './CanvasShape';

export default class Brick extends CanvasShape {
    public width: number;
    public height: number;
    public color: string;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        super(x, y);

        this.width = width;
        this.height = height;

        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    }

    clear(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(this.x, this.y, this.width, this.height);
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