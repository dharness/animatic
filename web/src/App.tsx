import DrawingView from "./components/DrawingView";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <RequireAuth>
        <DrawingView />
      </RequireAuth>
    </>
  );
}

export default App;
