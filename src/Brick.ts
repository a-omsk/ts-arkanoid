export default class Brick {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;

    private destroyed: boolean;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.color = color;

        this.destroyed = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.destroyed) {
            return false;
        }

        ctx.save();

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    }
}