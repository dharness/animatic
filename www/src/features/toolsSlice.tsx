import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum ToolId {
    Brush,
    Eraser
}

export interface ToolState {
    currentTool: ToolId
}

const initialState: ToolState = {
    currentTool: ToolId.Brush,
}

export const toolsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setTool: (state, action: PayloadAction<ToolId>) => {
            state.currentTool = action.payload;
        },
    },
})


export const { setTool } = toolsSlice.actions
export default toolsSlice.reducer