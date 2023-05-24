import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../app/store";
import { ToolId } from "../features/toolsSlice";
import Tool from "../features/Tool";
import Brush from "../features/BrushTool";
import Eraser from "../features/EraserTool";

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
    background: white;
`;

type Tools = Partial<Record<ToolId, Tool>>

const tools: Tools = {
    [ToolId.Brush]: new Brush(),
    [ToolId.Eraser]: new Eraser(),
};


function Artboard() {
    const activeToolId = useSelector((state: RootState) => state.tools.currentTool);
    const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const aspectRatio = 3 / 4;
    const canvasWidth = 500;
    const canvasHeight = canvasWidth * aspectRatio;
    const activeToolRef = useRef(tools[activeToolId]);

    function onMouseDown(event: MouseEvent) {
        event.stopPropagation();
        activeToolRef.current?.onMouseDown(event);
    }

    function onMouseUp(event: MouseEvent) {
        event.stopPropagation();
        activeToolRef.current?.onMouseUp(event);
    }

    function onMouseMove(event: MouseEvent) {
        event.stopPropagation();
        activeToolRef.current?.onMouseMove(event);
    }

    useEffect(() => {
        activeToolRef.current = tools[activeToolId];
        activeToolRef.current?.activate(canvasRef.current);
    }, [activeToolId])

    useEffect(() => {
        window.addEventListener("mouseup", onMouseUp);
        canvasRef.current?.addEventListener("mousedown", onMouseDown);
        canvasRef.current?.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
            canvasRef.current?.removeEventListener("mousedown", onMouseDown);
            canvasRef.current?.removeEventListener("mousemove", onMouseMove);
        }
    }, [])

    return (
        <StyledDrawingArea>
            <StyledCanvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </StyledDrawingArea>
    );
}

export default Artboard;