import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../app/store";
import { ToolId } from "../reducers/toolsSlice";
import Tool from "../utils/tools/Tool";
import Brush from "../utils/tools/BrushTool";
import Eraser from "../utils/tools/EraserTool";
import Cursor from "./Cursor";
import { selectIsSavingTrack } from "../reducers/trackSlice";
import { frameUpdated } from "../reducers/framesSlice";
import {
  selectActiveFrame,
  selectActiveFrameId,
} from "../reducers/workspaceSlice";
import { addImageToCanvas } from "../utils/canvasHelpers";

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

type Tools = Partial<Record<ToolId, Tool>>;

const tools: Tools = {
  [ToolId.Brush]: new Brush(),
  [ToolId.Eraser]: new Eraser(),
};

function DrawingSurface() {
  const dispatch = useAppDispatch();
  const activeToolId = useSelector(
    (state: RootState) => state.tools.currentTool
  );
  const isSaving = useSelector(selectIsSavingTrack);
  const activeFrameId = useSelector(selectActiveFrameId);
  const activeFrame = useSelector(selectActiveFrame);

  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  const aspectRatio = 3 / 4;
  const canvasWidth = 500;
  const canvasHeight = canvasWidth * aspectRatio;
  const activeToolRef = useRef(tools[activeToolId]);
  const drawingAreaRef = useRef<HTMLDivElement>(null);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const onMouseDown = (event: React.MouseEvent) => {
    activeToolRef.current?.onMouseDown(event.nativeEvent);
  };

  const onMouseUp = (event: MouseEvent) => {
    activeToolRef.current?.onMouseUp(event);
    const imgData = canvasRef.current?.toDataURL().split(",")[1];
    dispatch(frameUpdated({ imgData, frameId: activeFrameId }));
  };

  const onMouseMove = (event: React.MouseEvent) => {
    activeToolRef.current?.onMouseMove(event.nativeEvent);
  };

  const onMouseEnter = () => {
    setMouseIsOver(true);
  };

  const onMouseLeave = () => {
    setMouseIsOver(false);
  };
  useEffect(() => {
    addImageToCanvas(canvasRef.current, activeFrame?.imgData);
  }, [activeFrameId]);

  useEffect(() => {
    activeToolRef.current = tools[activeToolId];
    activeToolRef.current?.activate(canvasRef.current);
  }, [activeToolId]);

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [activeFrameId]);

  return (
    <StyledDrawingArea
      ref={drawingAreaRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isSaving && <div>Saving...</div>}
      <Cursor active={mouseIsOver} />
      <StyledCanvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      />
    </StyledDrawingArea>
  );
}

export default DrawingSurface;
