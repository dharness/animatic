import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import animaticApi from "./animaticApi";

export const saveCanvasData = createAsyncThunk(
  "canvas/saveCanvasData",
  async (_, thunkAPI) => {
    const response = await animaticApi.saveCanvas();
    return response.data;
  }
);

interface CanvasState {
  isSaving: boolean;
}

const initialState = {
  isSaving: false,
} as CanvasState;

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    saveCanvas(state) {
      state.isSaving = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCanvasData.fulfilled, (state, action) => {
        state.isSaving = false;
      })
      .addCase(saveCanvasData.rejected, (state, action) => {
        alert("save failed");
        state.isSaving = false;
      });
  },
});

export const { saveCanvas } = canvasSlice.actions;
export default canvasSlice.reducer;
