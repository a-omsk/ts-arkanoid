import CanvasShape, { CanvasShapeBounds } from './CanvasShape';

export default class Ball extends CanvasShape {
    public dx: number;
    public dy: number;

    public radius: number;
    public color: string;
    public glowFactor: number;

    constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string, glowFactor: number = 3) {
        super(x, y);

        this.x = x;
        this.y = y;

        this.dx = dx;
        this.dy = dy;

        this.radius = radius;
        this.color = color;
        this.glowFactor = glowFactor;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.shadowColor = 'rgba(100, 100, 255, 1)';

        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.radius * 3;

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
        const glowedRadius = this.radius * this.glowFactor;

        ctx.clearRect(
            this.x - glowedRadius,
            this.y - glowedRadius,
            glowedRadius * 2,
            glowedRadius * 2
        )
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

    swapXDirection(): void {
        this.dx = -this.dx;
    }

    swapYDirection(): void {
        this.dy = -this.dy;
    }
}