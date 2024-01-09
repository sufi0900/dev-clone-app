import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      toast.success("Tour Added Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTours(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      toast.success("Tour Deleted Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id);
      toast.success("Tour Updated Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearTour = createAction("Tour/clearTour");

const TourSlice = createSlice({
  name: "Tour",
  initialState: {
    Tour: {},
    Tours: [],
    allTours: [], // Add this property

    userTours: [],
    tagTours: [],
    relatedTours: [],
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
      .addCase(createTour.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(createTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = [action.payload];
      })
      .addCase(createTour.rejected, (state, action) => {
        state.loading = false
          ? action.payload.message
          : "Unknown error occurred";
      })

      .addCase(getTours.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(clearTour, (state) => {
        state.tour = {};
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.messge
          : "Unknown error occurred";
      })
      .addCase(getTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tour = action.payload;
      })

      .addCase(getTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })

      .addCase(getToursByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getToursByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userTours = action.payload || []; // Handle the case where userTours is undefined
      })
      .addCase(getToursByUser.rejected, (state, action) => {
        state.loading = false
          ? action.payload.message
          : "Unknown error occurred";
      })

      .addCase(deleteTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userTours = (state.userTours || []).filter(
            (item) => item._id !== id
          );
          state.tours = (state.tours || []).filter((item) => item._id !== id);
        }
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.loading = false
          ? action.payload.message
          : "Unknown error occurred";
      })
      .addCase(updateTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userTours = (state.userTours || []).map((item) =>
            item._id === id ? action.payload : item
          );
          state.tours = (state.tours || []).map((item) =>
            item._id === id ? action.payload : item
          );
        }
      })
      .addCase(updateTour.rejected, (state, action) => {
        state.loading = false
          ? action.payload.message
          : "Unknown error occurred";
      });
  },
});

export const { setCurrentPage } = TourSlice.actions;

export default TourSlice.reducer;
