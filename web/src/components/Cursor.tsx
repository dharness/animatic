import styled from "styled-components";
import { MousePosition, getMousePosition } from "../utils/mouse";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const StyledCursor = styled.div<{ $radius: number }>`
  box-sizing: border-box;
  border: solid 1px black;
  width: ${(props) => props.$radius}px;
  height: ${(props) => props.$radius}px;
  border-radius: ${(props) => props.$radius}px;
  position: fixed;
  pointer-events: none;
`;
interface CursorProps {
  active: boolean;
}

function Cursor({ active }: CursorProps) {
  const brushSize = useSelector((state: RootState) => state.tools.brushSize);
  const [mousePosition, setMousePosition] = useState<MousePosition>();

  function trackMousePosition(event: MouseEvent) {
    if (!document.body) return;
    const p = getMousePosition(document.body, event);
    setMousePosition(p);
  }

  useEffect(() => {
    window.addEventListener("mousemove", trackMousePosition);
    return () => {
      window.removeEventListener("mousemove", trackMousePosition);
    };
  }, []);

  if (!active || !mousePosition) return <></>;
  const { x, y } = mousePosition;
  const left = x - brushSize / 2;
  const top = y - brushSize / 2;
  const style = { left, top };

  return <StyledCursor style={style} $radius={brushSize} />;
}

export default Cursor;
