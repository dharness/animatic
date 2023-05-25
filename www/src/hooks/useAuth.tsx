import { useSelector } from "react-redux";
import { RootState } from "../app/store";

function useAuth() {
    const userId = useSelector((state: RootState) => state.user?.id);
    return userId && userId !== '';
}

export { useAuth };