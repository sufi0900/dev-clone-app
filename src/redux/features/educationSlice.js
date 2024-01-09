import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createEducation = createAsyncThunk(
  "Education/createEducation",
  async ({ updatedEducationData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createEducation(updatedEducationData);
      toast.success("Education Added Successfully");
      // navigate("/MyBlogs");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEducations = createAsyncThunk(
  "Education/getEducations",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getEducations(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEducation = createAsyncThunk(
  "Education/getEducation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getEducation(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchEducations = createAsyncThunk(
  "Education/searchEducations",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getEducationsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getEducationsByUser = createAsyncThunk(
  "Education/getEducationsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getEducationsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "Education/deleteEducation",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteEducation(id);
      toast.success("Education Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateEducation = createAsyncThunk(
  "Education/updateEducation",
  async (
    { id, updatedEducationData, toast, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updateEducation(updatedEducationData, id);
      toast.success("Education Updated Successfully");
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearEducation = createAction("Education/clearEducation");

const educationSlice = createSlice({
  name: "education",
  initialState: {
    Education: {},
    Educations: [],
    userEducations: [],

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
      .addCase(createEducation.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(createEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = [action.payload];
      })
      .addCase(createEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(getEducations.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(clearEducation, (state) => {
        state.education = {};
      })
      .addCase(getEducations.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getEducations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.messge
          : "Unknown error occurred";
      })
      .addCase(getEducation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.education = action.payload;
      })

      .addCase(getEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })

      .addCase(getEducationsByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEducationsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userEducations = action.payload;
      })
      .addCase(getEducationsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(deleteEducation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userEducations = state.userEducations.filter(
            (item) => item._id !== id
          );
          state.educations = state.educations.filter((item) => item._id !== id);
        }
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateEducation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userEducations = state.userEducations.map((item) =>
            item._id === id ? action.payload : item
          );
          state.educations = state.educations.map((item) =>
            item._id === id ? action.payload : item
          );
        }
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setCurrentPage } = educationSlice.actions;

export default educationSlice.reducer;
