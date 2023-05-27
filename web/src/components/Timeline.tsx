import styled from "styled-components";

const StyledTimeline = styled.div`
  background: orange;
  grid-row: 3/4;
  grid-column: 1/3;
`;

function Timeline() {
    return (<StyledTimeline>Timeline</StyledTimeline>);
}

export default Timeline;