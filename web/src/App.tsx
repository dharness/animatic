import { useEffect } from "react";
import DrawingWorkspace from "./components/DrawingWorkspace";
import RequireAuth from "./components/RequireAuth";
import { useAppDispatch } from "./app/store";
import { loadUser } from "./reducers/userSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [loadUser]);

  return (
    <>
      <RequireAuth>
        <DrawingWorkspace />
      </RequireAuth>
    </>
  );
}

export default App;
