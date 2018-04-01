import CanvasShape, { CanvasShapeBounds } from './CanvasShape';

export default class Bonus extends CanvasShape {
    public x: number;
    public y: number;
    public dy: number;

    public radius: number;
    public color: string;

    constructor(x: number, y: number, dy: number, radius: number, color: string) {
        super(x, y);

        this.x = x;
        this.y = y;

        this.dy = dy;

        this.radius = radius;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius - 1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    clear(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    move(): void {
        this.y = this.y + this.dy;
    }

    getBounds(): CanvasShapeBounds {
        return {
            x1: this.x - this.radius,
            y1: this.y - this.radius,
            x2: this.x + this.radius,
            y2: this.y + this.radius,
        };
    }
}