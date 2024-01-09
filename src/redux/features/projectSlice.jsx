import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createProject = createAsyncThunk(
  "Project/createProject",
  async ({ updatedProjectData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createProject(updatedProjectData);
      toast.success("Project Added Successfully");
      navigate("");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// In your projectSlice.js

export const getProjects = createAsyncThunk(
  "Project/getProjects",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getProjects(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchProjects = createAsyncThunk(
  "Project/searchProjects",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getProjectsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getProject = createAsyncThunk(
  "Project/getProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProject(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProjectsByUser = createAsyncThunk(
  "Project/getProjectsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getProjectsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "Project/deleteProject",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteProject(id);
      toast.success("Project Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "Project/updateProject",
  async ({ id, updatedProjectData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateProject(updatedProjectData, id);
      toast.success("Project Updated Successfully");

      // Navigate one step back
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearProject = createAction("Project/clearProject");

const ProjectSlice = createSlice({
  name: "Project",
  initialState: {
    Project: {},
    Projects: [],
    userProjects: [],

    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = [action.payload];
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(getProjects.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(clearProject, (state) => {
        state.project = {};
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.messge
          : "Unknown error occurred";
      })
      .addCase(getProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })

      .addCase(getProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })

      .addCase(getProjectsByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProjectsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = action.payload;
      })
      .addCase(getProjectsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(deleteProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userProjects = state.userProjects.filter(
            (item) => item._id !== id
          );
          state.projects = state.projects.filter((item) => item._id !== id);
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userProjects = state.userProjects.map((item) =>
            item._id === id ? action.payload : item
          );
          state.projects = state.projects.map((item) =>
            item._id === id ? action.payload : item
          );
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setCurrentPage } = ProjectSlice.actions;

export default ProjectSlice.reducer;
