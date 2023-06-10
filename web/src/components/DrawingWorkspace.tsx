import Header from "./Header";
import styled from "styled-components";
import Toolbar from "./Toolbar";
import DrawingSurface from "./DrawingSurface";
import Timeline from "./Timeline";
import { useAppDispatch } from "../app/store";
import { useEffect, useState } from "react";
import { loadTracks } from "../reducers/trackSlice";

const PageLayout = styled.div`
  background: red;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: grid;
  grid-template-rows: 60px 1fr 175px;
  grid-template-columns: 60px 1fr;
`;

function DrawingView() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTracks());
  }, []);

  return (
    <PageLayout>
      <Header />
      <Toolbar></Toolbar>
      <DrawingSurface></DrawingSurface>
      <Timeline></Timeline>
    </PageLayout>
  );
}

export default DrawingView;
