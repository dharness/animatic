import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Frame } from "../models/Frame";

export const loadProjects = createAction("loadProjects");

enum LoadingState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

interface WorkspaceState {
  loadingStatuses: { [key: string]: LoadingState };
  activeFrameId?: string;
  frameIdToClear: string;
}

const initialState = {
  loadingStatuses: {},
  activeFrameId: "default",
  frameIdToClear: "",
} as WorkspaceState;

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    frameSelected(state, action) {
      state.activeFrameId = action.payload;
    },
    frameMarkedForClear: (state, action) => {
      state.frameIdToClear = action.payload.frameId;
    },
  },
});

export const { frameSelected, frameMarkedForClear } = workspaceSlice.actions;
export default workspaceSlice.reducer;

export const selectActiveFrameId = (state: RootState): string =>
  state.workspace.activeFrameId || "";
export const selectActiveFrame = (state: RootState): Frame =>
  state.entities.frames[selectActiveFrameId(state)];
export const selectFrameIdToClear = (state: RootState): string =>
  state.workspace.frameIdToClear;
