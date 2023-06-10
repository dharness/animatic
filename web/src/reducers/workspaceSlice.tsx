import { createAction, createSlice } from "@reduxjs/toolkit";

export const loadProjects = createAction("loadProjects");

enum LoadingState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

interface WorkspaceState {
  loadingStatuses: { [key: string]: LoadingState };
  activeFrame?: string;
}

const initialState = {
  loadingStatuses: {},
  activeFrame: undefined,
} as WorkspaceState;

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    frameActivated(state, action) {
      state.activeFrame = action.payload;
    },
  },
});

export const { frameActivated } = workspaceSlice.actions;
export default workspaceSlice.reducer;
