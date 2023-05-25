import { Position, getMousePosition } from "../utils/mouse";
import Tool from './Tool'

export default class Brush implements Tool {

    private isDrawing: boolean = false;
    private prevCursorPos: Position = { x: 0, y: 0 };
    private currentCursorPos: Position = { x: 0, y: 0 };
    protected canvas: HTMLCanvasElement | null = null;
    protected ctx: CanvasRenderingContext2D | null = null;

    activate(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        if (!this.ctx) return;
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "black";
        this.ctx.globalCompositeOperation = "source-over";
    }

    onMouseDown(event: MouseEvent) {
        if (!this.canvas) return;
        this.isDrawing = true;
        this.prevCursorPos = getMousePosition(this.canvas, event);
        this.draw(event);
    }

    onMouseUp() {
        this.isDrawing = false;
    }

    onMouseMove(event: MouseEvent) {
        if (!this.isDrawing) return;
        this.draw(event);
    }

    draw(event: MouseEvent) {
        if (!this.ctx) return;
        if (!this.canvas) return;
        this.currentCursorPos = getMousePosition(this.canvas, event);

        const { x: x1, y: y1 } = this.prevCursorPos;
        const { x: x2, y: y2 } = this.currentCursorPos;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.save();

        this.prevCursorPos = this.currentCursorPos;
    }
}