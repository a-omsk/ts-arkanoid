export default class Vaus {
    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public color: string;

    public newX: number | null;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.x = x;
        this.y = y;

        this.newX = null;

        this.width = width;
        this.height = height;

        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D) {
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

    clear(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    move(x: number, maxWidth: number) {
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
}