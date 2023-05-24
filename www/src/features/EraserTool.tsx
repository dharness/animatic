import Brush from "./BrushTool";

export default class Eraser extends Brush {
    activate(canvas: HTMLCanvasElement) {
        super.activate(canvas);
        if (!this.ctx) return;
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "black";
        this.ctx.globalCompositeOperation = "destination-out";
    }
}