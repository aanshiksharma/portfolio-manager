import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    allProjects: [],
  },
  reducers: {
    addProject: (state, action) => {},
    removeProject: (state, action) => {},
    editProject: (state, action) => {},
  },
});

export const { addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
