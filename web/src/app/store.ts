import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import toolsReducer from "./../reducers/toolsSlice";
import userReducer from "./../reducers/userSlice";
import tracksReducer from "./../reducers/trackSlice";
import framesReducer from "./../reducers/framesSlice";
import workspaceReducer from "./../reducers/workspaceSlice";

export const store = configureStore({
  reducer: {
    tools: toolsReducer,
    user: userReducer,
    entities: combineReducers({
      tracks: tracksReducer,
      frames: framesReducer,
    }),
    workspace: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
