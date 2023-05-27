import type { RootState } from '../app/store'
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import { ToolId, setTool } from '../features/toolsSlice'
import icons from '../features/tools/toolsIcons'

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
  const currentToolId = useSelector((state: RootState) => state.tools.currentTool);
  const dispatch = useDispatch();

  const getToolButtonClickHandler = (toolType: ToolId) => () => {
    dispatch(setTool(toolType));
  }

  return (
    <StyledToolbar>
      {[ToolId.Brush, ToolId.Eraser].map(toolId => {
        return (<ToolButton
          key={toolId}
          $icon={icons[toolId]}
          $active={currentToolId === toolId}
          onClick={getToolButtonClickHandler(toolId)}
        />)
      })}
    </StyledToolbar>
  );
}

export default Toolbar;