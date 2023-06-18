import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import animaticApi from "../utils/animaticApi";
import { Track, defaultTrack, parseTracks } from "../models/Track";
import { frameAdded, frameDeleted, framesLoaded } from "./framesSlice";
import { RootState } from "../app/store";
import { frameSelected } from "./workspaceSlice";

export const saveTrack = createAsyncThunk(
  "tracks/save",
  async (_payload, { getState }) => {
    const state = getState() as RootState;
    const track = selectActiveTack(state);
    const frameState = state.entities.frames;
    const frames = track.frames.map((frameId) => frameState[frameId]);
    const saveData = { ...track, frames };
    await animaticApi.saveTrack(saveData);
  }
);

export const loadTracks = createAsyncThunk(
  "tracks/load",
  async (_payload, { dispatch }) => {
    const { tracks, frames } = parseTracks(await animaticApi.getTracks());
    dispatch(frameSelected(_.values(tracks)[0].frames[0]));
    dispatch(framesLoaded(frames));
    return { tracks };
  }
);

interface TracksState {
  [key: string]: Track;
}

const initialState = {
  [defaultTrack.id]: defaultTrack,
} as TracksState;

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTracks.fulfilled, (state, action) => {
        return _.keyBy(action.payload.tracks, "id");
      })
      .addCase(loadTracks.rejected, (state, action) => {
        console.log("Failed to load tracks");
      })
      .addCase(saveTrack.rejected, (state, action) => {
        console.error("Failed to save track");
      })
      .addCase(frameAdded, (state, action) => {
        const { trackId, frameId } = action.payload;
        state[trackId].frames.push(frameId);
      })
      .addCase(frameDeleted, (state, action) => {
        const nextFrames = state[action.payload.trackId].frames.filter(
          (frameId: string) => frameId !== action.payload.frameId
        );
        state[action.payload.trackId].frames = nextFrames;
      });
  },
});

export const {} = tracksSlice.actions;
export default tracksSlice.reducer;

export const selectIsSavingTrack = (state: RootState) => false;
export const selectActiveTack = (state: RootState): Track =>
  _.values(state.entities.tracks)[0];
