import CanvasShape, { CanvasShapeBounds } from './CanvasShape';

export default class Vaus extends CanvasShape {
    public width: number;
    public height: number;
    public velocity: number;
    public color: string;

    constructor(x: number, y: number, width: number, height: number, color: string, velocity: number) {
        super(x, y);

        this.width = width;
        this.height = height;

        this.color = color;
        this.velocity = velocity;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.globalAlpha = 0.7;
        ctx.fillStyle = this.color;

        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.globalAlpha = 1;
        ctx.strokeStyle = 'rgba(100, 100, 255)';

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x, this.y);

        ctx.stroke();

        ctx.restore();
    }

    clear(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
    }

    move(x: number, maxWidth: number): void {
        const halfVausWidth = Math.floor(this.width / 2);
        const newX = x - halfVausWidth;

        if (newX < 0) {
            this.x = 0;
        } else if (x + halfVausWidth > maxWidth) {
            this.x = maxWidth - this.width;
        } else {
            this.x = newX;
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