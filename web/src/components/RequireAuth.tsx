import { ReactElement, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  loadUser,
  selectIsUserAuthed,
  selectIsUserError,
  selectIsUserLoading,
} from "../reducers/userSlice";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }: { children: ReactElement }) {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsUserLoading);
  const isAuthed = useSelector(selectIsUserAuthed);
  const isError = useSelector(selectIsUserError);

  useEffect(() => {
    dispatch(loadUser());
  }, [loadUser]);

  if (isLoading && !isError) {
    return <div>Loading...</div>;
  }

  return isAuthed ? children : <Navigate to="/" replace />;
}

export default RequireAuth;
