import CanvasShape, { CanvasShapeBounds } from './CanvasShape';

export default class Ball implements CanvasShape {
    public x: number;
    public y: number;
    public dx: number;
    public dy: number;

    public radius: number;
    public color: string;

    constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string) {
        this.x = x;
        this.y = y;

        this.dx = dx;
        this.dy = dy;

        this.radius = radius;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    move(): void {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }

    clear(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
    }

    getBounds(): CanvasShapeBounds {
        return {
            x1: this.x - this.radius,
            y1: this.y - this.radius,
            x2: this.x + this.radius,
            y2: this.y + this.radius,
        };
    }

    changeDirectionIfIntersectsBorder(ctx: CanvasRenderingContext2D): boolean | undefined {
        const { canvas } = ctx;
        const x = this.x - this.radius;
        const y = this.y - this.radius;

        if (x < 0) {
            this.x = this.radius;
            this.swapXDirection();
        } else if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.swapXDirection();
        }

        if (y < 0) {
            this.y = this.radius;
            this.swapYDirection();
        } else if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.swapYDirection();

            return true;
        }
    }

    isIntersectsShape(shapeBounds: CanvasShapeBounds): boolean {
        const { x1, y1, x2, y2 } = this.getBounds();

        return !(shapeBounds.x2 <= x1 || x2 <= shapeBounds.x1 || shapeBounds.y2 <= y1 || y2 <= shapeBounds.y1);
    }

    swapXDirection(): void {
        this.dx = -this.dx;
    }

    swapYDirection(): void {
        this.dy = -this.dy;
    }
}