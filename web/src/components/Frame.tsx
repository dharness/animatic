import styled from "styled-components/macro";

const StyledFrame = styled.div<{ $active: any }>`
  width: 200px;
  height: 100px;
  background: grey;
  border-radius: 15px;
  box-sizing: border-box;
  overflow: clip;
  display: flex;
  border: ${(props) => (props.$active ? "solid 2px plum" : "")};
  :hover {
    border: solid 2px blue;
  }
`;

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PreviewImg = styled.img`
  background: white;
  height: 100%;
  margin: auto;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 100;
`;

interface FrameProps {
  imgSrc: string;
  active: boolean;
  onDelete: (event: any) => void;
  onClick: (event: any) => void;
}

const Frame = ({ imgSrc, active, onDelete, onClick }: FrameProps) => {
  return (
    <StyledFrame $active={active} onClick={onClick}>
      <Layout>
        <DeleteButton onClick={onDelete}>X</DeleteButton>
        <PreviewImg src={"data:image/gif;base64," + imgSrc} />
      </Layout>
    </StyledFrame>
  );
};

export default Frame;
