import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { Frame, defaultFrame } from "../models/Frame";
import { RootState } from "../app/store";

interface FrameState {
  [key: string]: Frame;
}

export const initialState = {
  [defaultFrame.id]: defaultFrame,
} as FrameState;

const framesSlice = createSlice({
  name: "frames",
  initialState,
  reducers: {
    framesLoaded: (state, action) => {
      if (_.isEmpty(action.payload)) return state;
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
