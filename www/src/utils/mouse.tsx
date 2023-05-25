export interface Position {
    x: number;
    y: number;
}

export function getMousePosition(relativeToDiv: HTMLElement, event: MouseEvent): Position {
    const rect = relativeToDiv.getBoundingClientRect();
    const scaleX = relativeToDiv.clientWidth / rect.width;
    const scaleY = relativeToDiv.clientHeight / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    }
}