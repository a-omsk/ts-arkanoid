export default interface Shape {
    draw(ctx: CanvasRenderingContext2D): void;
    clear(ctx: CanvasRenderingContext2D): void;
}
