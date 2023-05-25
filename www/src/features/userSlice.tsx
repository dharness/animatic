import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from './userApi';

export const loadUser = createAsyncThunk(
    'users/load',
    async () => {
        const response = await userApi.loadUser();
        const payload = {
            authToken: response.data.session?.access_token || "",
            email: response.data.session?.user?.email || "",
            id: response.data.session?.user?.id || "",
        };
        return payload;
    });

export const signUpUser = createAsyncThunk(
    'users/signup',
    async ({ email, password }: { email: string, password: string }) => {
        const response = await userApi.signUpUser(email, password);
        const payload = {
            authToken: response.data.session?.access_token || "",
            email: response.data.user?.email || "",
            id: response.data.user?.id || "",
        };
        return payload;
    });

export const logInUser = createAsyncThunk(
    'users/login',
    async ({ email, password }: { email: string, password: string }) => {
        const response = await userApi.logInUser(email, password).then();
        const payload = {
            authToken: response.data.session?.access_token || "",
            email: response.data.user?.email || "",
            id: response.data.user?.id || "",
        };
        return payload;
    });

interface UsersState {
    id: string,
    email: string,
    authToken: string
}

const initialState = {
    email: '',
    id: '',
    authToken: '',
} as UsersState;

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logInUser.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
    },
})

export const { } = usersSlice.actions;
export default usersSlice.reducer;