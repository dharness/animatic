import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RequireAuth({ children }: { children: ReactElement }) {
    const authed = useAuth();
    return authed === true ? children : <Navigate to="/" replace />;
}

export default RequireAuth;