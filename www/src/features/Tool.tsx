export default interface Tool {
    onMouseDown: (event: MouseEvent) => void;
    onMouseUp: (event: MouseEvent) => void;
    onMouseMove: (event: MouseEvent) => void;
    activate: (canvas: HTMLCanvasElement) => void;
}