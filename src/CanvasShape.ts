export interface CanvasShapeBounds {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
}

export default abstract class CanvasShape {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;

    abstract clear(ctx: CanvasRenderingContext2D): void;

    abstract getBounds(): CanvasShapeBounds;

    isIntersectsShape(shapeBounds: CanvasShapeBounds): boolean {
        const { x1, y1, x2, y2 } = this.getBounds();

        return !(shapeBounds.x2 <= x1 || x2 <= shapeBounds.x1 || shapeBounds.y2 <= y1 || y2 <= shapeBounds.y1);
    }
}

