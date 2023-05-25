import styled from "styled-components";

const StyledHeader = styled.div`
  background: yellow;
  grid-row: 1/2;
  grid-column: 1/3;
`;

function Header() {
    return (<StyledHeader>Header</StyledHeader>);
}

export default Header;