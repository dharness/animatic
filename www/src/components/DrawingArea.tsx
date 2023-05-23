import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Position {
    x: number;
    y: number;
}

const StyledDrawingArea = styled.div`
    background: grey;
    width: calc(100vw - 60px);
    max-width: calc(100vw - 60px);
    border: solid 10px red;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
`;

const StyledCanvas = styled.canvas`
    box-sizing: border-box;
    margin: auto;
`;

function getMousePos(canvas: any, event: MouseEvent): Position {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    }
}

function Artboard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const aspectRatio = 3 / 4;
    const canvasWidth = 500;
    const canvasHeight = canvasWidth * aspectRatio;
    const isDrawingRef = useRef(false);
    const pevCursorPos = useRef<Position>({ x: 0, y: 0 });
    const currentCursorPos = useRef<Position>({ x: 0, y: 0 });

    function onMouseDown(event: MouseEvent) {
        event.stopPropagation();
        isDrawingRef.current = true;
        pevCursorPos.current = getMousePos(canvasRef.current, event);
    }

    function onMouseUp(e: MouseEvent) {
        e.stopPropagation();
        isDrawingRef.current = false;
    }

    function onMouseMove(event: MouseEvent) {
        event.stopPropagation();
        if (!isDrawingRef.current) return;
        currentCursorPos.current = getMousePos(canvasRef.current, event);

        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        const { x: x1, y: y1 } = pevCursorPos.current;
        const { x: x2, y: y2 } = currentCursorPos.current;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
        ctx.stroke();

        pevCursorPos.current = currentCursorPos.current;
    }

    useEffect(() => {
        canvasRef.current?.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        canvasRef.current?.addEventListener("mousemove", onMouseMove);

        return () => {
            canvasRef.current?.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            canvasRef.current?.removeEventListener("mousemove", onMouseMove);
        }
    }, [])

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;
        const w = canvasRef.current?.clientWidth || 0;
        const h = canvasRef.current?.clientHeight || 0;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
    });
    return (
        <StyledDrawingArea>
            <StyledCanvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </StyledDrawingArea>
    );
}

export default Artboard;