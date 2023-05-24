import { configureStore } from '@reduxjs/toolkit'
import toolsReducer from '../features/toolsSlice'

export const store = configureStore({
    reducer: {
        tools: toolsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch