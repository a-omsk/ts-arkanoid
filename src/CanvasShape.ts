export interface CanvasShapeBounds {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
}

export default interface CanvasShape {
    draw(ctx: CanvasRenderingContext2D): void;

    clear(ctx: CanvasRenderingContext2D): void;

    getBounds(): CanvasShapeBounds;
}

