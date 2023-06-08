import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import toolsReducer from "../reducers/toolsSlice";
import userReducer from "../reducers/userSlice";
import projectsReducer from "../reducers/projectsSlice";
import canvasReducer from "../reducers/canvasSlice";
import tracksReducer from "../reducers/tracksSlice";

export const store = configureStore({
  reducer: {
    tools: toolsReducer,
    user: userReducer,
    projects: projectsReducer,
    canvas: canvasReducer,
    tracks: tracksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
