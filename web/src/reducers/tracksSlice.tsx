import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import animaticApi from "../utils/animaticApi";

export const loadTracks = createAsyncThunk("tracks/load", async () => {
  const { data: tracks } = await animaticApi.getAllTracks();
  if (!tracks) {
    await animaticApi.createTrack();
  }
  return { tracks };
});

interface Frame {
  imgUrl: string;
  duration: number;
}

interface Track {
  id: string;
  frames: Frame[];
}

interface TracksState {
  tracks: Track[];
  currentTrack: Track | null;
}

const initialState = {
  tracks: [],
  currentTrack: null,
} as TracksState;

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTracks.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(loadTracks.rejected, (state, action) => {
        console.log("Failed to load tracks");
      });
  },
});

export const {} = projectsSlice.actions;
export default projectsSlice.reducer;
