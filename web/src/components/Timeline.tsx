import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import {
  frameAdded,
  frameDeleted,
  selectFrames,
} from "../reducers/framesSlice";
import { useSelector } from "react-redux";
import Frame from "./Frame";
import { useAppDispatch } from "../app/store";
import { selectActiveTack } from "../reducers/trackSlice";
import {
  frameMarkedForClear,
  frameSelected,
  selectActiveFrameId,
} from "../reducers/workspaceSlice";
import { useState } from "react";

const TimelineWrapper = styled.div`
  background: orange;
  grid-row: 3/4;
  grid-column: 1/3;
  display: flex;
  flex-direction: column;
`;

const Toolbar = styled.div`
  background: black;
`;

const Frames = styled.div`
  padding: 20px;
  background: crimson;
  flex: 1;
  display: flex;
`;

function Timeline() {
  const frames = useSelector(selectFrames);
  const activeFrameId = useSelector(selectActiveFrameId);
  const { id: trackId } = useSelector(selectActiveTack);
  const dispatch = useAppDispatch();
  const [playIntervalId, setPlayIntervalId] = useState(0);

  const addFrame = () => {
    const frameId = uuidv4();
    dispatch(frameAdded({ trackId, frameId }));
  };

  const deleteFrame = (event: any, frameId: string) => {
    event.stopPropagation();
    dispatch(frameDeleted({ trackId, frameId }));
  };

  const selectFrame = (frameId: string) => {
    dispatch(frameSelected(frameId));
  };

  const clearFrame = () => {
    dispatch(frameMarkedForClear({ frameId: activeFrameId }));
  };

  const playAnimation = () => {
    if (playIntervalId) {
      setPlayIntervalId(0);
      return clearInterval(playIntervalId);
    }

    const frameIds = Object.keys(frames);
    let i = 0;
    const intervalId: number = setInterval(() => {
      const frameId = frameIds[i];
      dispatch(frameSelected(frameId));
      i = (i + 1) % frameIds.length;
    }, 500);
    setPlayIntervalId(intervalId);
    console.log(frames);
  };

  return (
    <TimelineWrapper>
      <Toolbar>
        <button onClick={addFrame}>Add Frame</button>
        <button onClick={clearFrame}>Clear Frame</button>
        <button onClick={playAnimation}>
          {playIntervalId ? "Pause" : "Play"}
        </button>
      </Toolbar>
      <Frames>
        {Object.values(frames).map((frame) => (
          <Frame
            active={frame.id === activeFrameId}
            key={frame.id}
            imgSrc={frame.imgData}
            onClick={() => selectFrame(frame.id)}
            onDelete={(e) => deleteFrame(e, frame.id)}
          />
        ))}
      </Frames>
    </TimelineWrapper>
  );
}

export default Timeline;
