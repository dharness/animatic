import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../utils/userApi";
import { RootState } from "../app/store";

export const loadUser = createAsyncThunk("users/load", async () => {
  const response = await userApi.loadUser();
  const payload: UsersState = {
    authToken: response.data.session?.access_token || "",
    email: response.data.session?.user?.email || "",
    id: response.data.session?.user?.id || "",
  };
  return payload;
});

export const signUpUser = createAsyncThunk(
  "users/signup",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await userApi.signUpUser(email, password);
    const payload: UsersState = {
      authToken: response.data.session?.access_token || "",
      email: response.data.user?.email || "",
      id: response.data.user?.id || "",
    };
    return payload;
  }
);

export const logInUser = createAsyncThunk(
  "users/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await userApi.logInUser(email, password).then();
    const payload: UsersState = {
      authToken: response.data.session?.access_token || "",
      email: response.data.user?.email || "",
      id: response.data.user?.id || "",
    };
    return payload;
  }
);

interface UsersState {
  id: string;
  email: string;
  authToken: string;
  loading?: boolean;
  error?: boolean;
}

const initialState = {
  email: "",
  id: "",
  authToken: "",
  loading: false,
  error: false,
} as UsersState;

const usersSlice = createSlice({
  name: "users",
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
        if (!action.payload.authToken) {
          Object.assign(state, { loading: false, error: true });
        }
        Object.assign(state, action.payload, { loading: false });
      })
      .addCase(loadUser.pending, (state) => {
        Object.assign(state, { loading: true });
      });
  },
});

export const selectIsUserLoading = (state: RootState) => {
  return state.user.loading || state.user.id === "";
};

export const selectIsUserAuthed = (state: RootState) => {
  return !!state.user.id && !!state.user.authToken;
};

export const selectIsUserError = (state: RootState) => state.user.error;

export const {} = usersSlice.actions;
export default usersSlice.reducer;
