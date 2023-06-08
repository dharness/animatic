import { createAction, createSlice } from "@reduxjs/toolkit";

export const loadProjects = createAction("loadProjects");

interface ProjectsState {
  entities: [];
}

const initialState = {
  entities: [],
} as ProjectsState;

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProjects, (state, action) => {
      console.log("project slice");
    });
  },
});

export const {} = projectsSlice.actions;
export default projectsSlice.reducer;
