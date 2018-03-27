export default class Ball {
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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    move() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }

    clear(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
    }

    changeDirectionIfIntersectsBorder(ctx: CanvasRenderingContext2D) {
        const { canvas } = ctx;
        const x = this.x - this.radius;
        const y = this.y - this.radius;
        var size = this.radius * 2;

        if (x < 0) {
            this.x = this.radius;
            this.dx = -this.dx;
        } else if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.dx = -this.dx;
        }

        if (y < 0) {
            this.y = this.radius;
            this.dy = -this.dy;
        } else if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.dy = -this.dy;

            return true;
        }
    }
}