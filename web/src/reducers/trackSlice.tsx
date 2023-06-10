import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import animaticApi from "../utils/animaticApi";
import { Track, parseTracks } from "../models/Track";
import { framesLoaded } from "./framesSlice";
import { RootState } from "../app/store";

export const saveTrack = createAsyncThunk("tracks/save", async () => {});

export const loadTracks = createAsyncThunk(
  "tracks/load",
  async (_, { dispatch }) => {
    const { tracks, frames } = parseTracks(await animaticApi.getTracks());

    dispatch(framesLoaded(frames));
    return { tracks };
  }
);

interface TracksState {
  [key: string]: Track;
}

const initialState = {} as TracksState;

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
      });
  },
});

export const {} = tracksSlice.actions;
export default tracksSlice.reducer;

export const selectIsSavingTrack = (state: RootState) => false;
