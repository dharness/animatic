import Header from './components/Header'
import styled from 'styled-components';
import Toolbar from './components/Toolbar';
import Artboard from './components/DrawingArea';
import Timeline from './components/Timeline';


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

function App() {

  return (
    <>
      <PageLayout>
        <Header />
        <Toolbar></Toolbar>
        <Artboard></Artboard>
        <Timeline></Timeline>
      </PageLayout>
    </>
  )
}

export default App
