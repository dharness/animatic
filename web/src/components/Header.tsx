import styled from "styled-components";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { saveTrack, selectIsSavingTrack } from "../reducers/trackSlice";

const StyledHeader = styled.div`
  background: yellow;
  grid-row: 1/2;
  grid-column: 1/3;
`;

function Header() {
  const isSaving = useSelector(selectIsSavingTrack);
  const dispatch = useAppDispatch();

  function onSaveClick() {
    dispatch(saveTrack());
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
