import styled from "styled-components";
import brushIcon from "./../assets/brush.svg"
import eraserIcon from "./../assets/eraser.svg"

const StyledToolbar = styled.div`
  background: plum;
  display: flex;
  flex-direction: column;
`;

const ToolButton = styled.button<{ $icon: string, $active: boolean }>`
  background-image: url(${props => props.$icon});
  background-color: ${props => props.$active ? "grey" : "transparent"};;
  background-repeat: no-repeat;
  background-position: center;
  height: 40px;
  margin: 10px;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

function Toolbar() {
  return (
    <StyledToolbar>
      <ToolButton $icon={brushIcon} />
      <ToolButton $icon={eraserIcon} />
    </StyledToolbar>
  );
}

export default Toolbar;