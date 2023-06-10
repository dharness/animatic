import { createSelector, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { Frame } from "../models/Frame";
import { RootState } from "../app/store";

interface FrameState {
  [key: string]: Frame;
}

const initialState = {} as FrameState;

const framesSlice = createSlice({
  name: "frames",
  initialState,
  reducers: {
    framesLoaded: (state, action) => {
      return action.payload;
    },
    frameUpdated: (state, action) => {
      const { imgData, frameId } = action.payload;
      if (state[frameId]) {
        state[frameId].imgData = imgData;
      }
    },
  },
});

export const { framesLoaded, frameUpdated } = framesSlice.actions;
export default framesSlice.reducer;

export const selectFrames = (state: RootState) => state.entities.frames;
export const selectActiveFrame = createSelector([selectFrames], (frames) => {
  // return the first frame for now
  // since we dont support selecting frames yet
  for (const [_, frame] of Object.entries(frames)) {
    return frame;
  }
});
export const selectIsFrameLoaded = (state: RootState, frameId: string) => {
  const hasUrl = state.entities.frames[frameId]?.imgUrl;
  const hasData = state.entities.frames[frameId]?.imgData;
  return Boolean(hasUrl && hasData);
};
