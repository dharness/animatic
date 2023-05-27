import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../app/store";
import { ToolId } from "../features/toolsSlice";
import Tool from "../features/tools/Tool";
import Brush from "../features/tools/BrushTool";
import Eraser from "../features/tools/EraserTool";
import Cursor from "./Cursor";
import { saveCanvasData } from "../features/canvasSlice";

const StyledDrawingArea = styled.div`
    background: grey;
    width: calc(100vw - 60px);
    max-width: calc(100vw - 60px);
    border: solid 10px red;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    cursor: none;
`;

const StyledCanvas = styled.canvas`
    box-sizing: border-box;
    margin: auto;
    background: white;
`;

type Tools = Partial<Record<ToolId, Tool>>

const tools: Tools = {
    [ToolId.Brush]: new Brush(),
    [ToolId.Eraser]: new Eraser(),
};


function Artboard() {
    const dispatch = useAppDispatch();
    const activeToolId = useSelector((state: RootState) => state.tools.currentTool);
    const isSaving = useSelector((state: RootState) => state.canvas.isSaving);
    const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const aspectRatio = 3 / 4;
    const canvasWidth = 500;
    const canvasHeight = canvasWidth * aspectRatio;
    const activeToolRef = useRef(tools[activeToolId]);
    const drawingAreaRef = useRef<HTMLDivElement>(null);
    const [mouseIsOver, setMouseIsOver] = useState(false);

    function onMouseDown(event: MouseEvent) {
        activeToolRef.current?.onMouseDown(event);
    }

    function onMouseUp(event: MouseEvent) {
        activeToolRef.current?.onMouseUp(event);
    }

    function onMouseMove(event: MouseEvent) {
        activeToolRef.current?.onMouseMove(event);
    }

    function onMouseEnter() { setMouseIsOver(true); }
    function onMouseLeave() { setMouseIsOver(false); }

    useEffect(() => {
        if (!isSaving) return;
        dispatch(saveCanvasData())
    }, [isSaving]);

    useEffect(() => {
        activeToolRef.current = tools[activeToolId];
        activeToolRef.current?.activate(canvasRef.current);
    }, [activeToolId])

    useEffect(() => {
        window.addEventListener("mouseup", onMouseUp);
        canvasRef.current?.addEventListener("mousedown", onMouseDown);
        canvasRef.current?.addEventListener("mousemove", onMouseMove);
        drawingAreaRef.current?.addEventListener("mouseenter", onMouseEnter);
        drawingAreaRef.current?.addEventListener("mouseleave", onMouseLeave);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
            canvasRef.current?.removeEventListener("mousedown", onMouseDown);
            canvasRef.current?.removeEventListener("mousemove", onMouseMove);
            drawingAreaRef.current?.removeEventListener("mouseenter", onMouseEnter);
            drawingAreaRef.current?.removeEventListener("mouseleave", onMouseLeave);
        }
    }, [])

    return (
        <StyledDrawingArea ref={drawingAreaRef}>
            {isSaving && <div>Saving...</div>}
            <Cursor active={mouseIsOver} />
            <StyledCanvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </StyledDrawingArea >
    );
}

export default Artboard;