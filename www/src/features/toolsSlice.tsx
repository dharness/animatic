import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum ToolId {
    Brush,
    Eraser
}

export interface ToolState {
    currentTool: ToolId
    brushSize: number
}

const initialState: ToolState = {
    currentTool: ToolId.Brush,
    brushSize: 10,
}

export const toolsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setTool: (state, action: PayloadAction<ToolId>) => {
            state.currentTool = action.payload;
        },
        incrementBrushSize: (state) => {
            state.brushSize++;
        },
        decrementBrushSize: (state) => {
            state.brushSize--;
        }
    },
})


export const { setTool, incrementBrushSize, decrementBrushSize } = toolsSlice.actions
export default toolsSlice.reducer