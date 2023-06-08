import styled from "styled-components";
import { RootState, useAppDispatch } from "../app/store";
import { saveCanvas } from "../reducers/canvasSlice";
import { useSelector } from "react-redux";

const StyledHeader = styled.div`
  background: yellow;
  grid-row: 1/2;
  grid-column: 1/3;
`;

function Header() {
  const isSaving = useSelector((state: RootState) => state.canvas.isSaving);
  const dispatch = useAppDispatch();

  function onSaveClick() {
    dispatch(saveCanvas());
  }

  return (
    <StyledHeader>
      <button onClick={onSaveClick} disabled={isSaving}>
        Save
      </button>
    </StyledHeader>
  );
}

export default Header;
