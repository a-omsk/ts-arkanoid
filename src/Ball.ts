export default class Ball {
    public x: number;
    public y: number;

    public radius: number;
    public color: string;

    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;

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

    clear(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
    }
}