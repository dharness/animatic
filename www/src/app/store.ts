import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import toolsReducer from '../features/toolsSlice'
import userReducer from '../features/userSlice'
import projectsReducer from '../features/projectsSlice'


export const store = configureStore({
    reducer: {
        tools: toolsReducer,
        user: userReducer,
        projects: projectsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;