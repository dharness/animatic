import { ReactElement } from "react";
import {
  selectIsUserAuthed,
  selectIsUserError,
  selectIsUserLoading,
} from "../reducers/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }: { children: ReactElement }) {
  const isLoading = useSelector(selectIsUserLoading);
  const isAuthed = useSelector(selectIsUserAuthed);
  const isError = useSelector(selectIsUserError);

  if (isLoading && !isError) {
    return <div>Loading...</div>;
  }

  return isAuthed ? children : <Navigate to="/" replace />;
}

export default RequireAuth;
