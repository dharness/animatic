import styled from "styled-components";
import { selectFrames } from "../reducers/framesSlice";
import { useSelector } from "react-redux";
import Frame from "./Frame";

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
`;

function Timeline() {
  const frames = useSelector(selectFrames);
  console.log(frames);
  return (
    <TimelineWrapper>
      <Toolbar>
        <button>Add Frame</button>
      </Toolbar>
      <Frames>
        {Object.values(frames).map((frame) => (
          <Frame key={frame.id} imgSrc={frame.imgData} />
        ))}
      </Frames>
    </TimelineWrapper>
  );
}

export default Timeline;
