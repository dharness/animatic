import styled from "styled-components";

const StyledFrame = styled.div`
  width: 200px;
  height: 100px;
  background: grey;
  border-radius: 15px;
  box-sizing: border-box;
  overflow: clip;
  display: flex;
  :hover {
    border: solid 2px blue;
  }
`;

const PreviewImg = styled.img`
  background: white;
  height: 100%;
  margin: auto;
`;

interface FrameProps {
  imgSrc: string;
}

const Frame = ({ imgSrc }: FrameProps) => {
  return (
    <StyledFrame>
      <PreviewImg src={"data:image/gif;base64," + imgSrc} />
    </StyledFrame>
  );
};

export default Frame;
