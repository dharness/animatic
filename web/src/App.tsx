import { useEffect } from "react";
import { loadUser } from "./reducers/userSlice";
import DrawingView from "./components/DrawingView";
import RequireAuth from "./components/RequireAuth";
import { useAppDispatch } from "./app/store";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [loadUser]);

  return (
    <>
      <RequireAuth>
        <DrawingView />
      </RequireAuth>
    </>
  );
}

export default App;
