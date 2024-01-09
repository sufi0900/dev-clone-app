import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createPortfolio = createAsyncThunk(
  "Portfolio/createPortfolio",
  async ({ updatedPortfolioData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createPortfolio(updatedPortfolioData);
      toast.success("Portfolio Added Successfully");
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// In your PortfolioSlice.js

export const getPortfolios = createAsyncThunk(
  "Portfolio/getPortfolios",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getPortfolios(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchPortfolios = createAsyncThunk(
  "Portfolio/searchPortfolios",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getPortfoliosBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getPortfolio = createAsyncThunk(
  "Portfolio/getPortfolio",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getPortfolio(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPortfoliosByUser = createAsyncThunk(
  "Portfolio/getPortfoliosByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getPortfoliosByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  "Portfolio/deletePortfolio",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deletePortfolio(id);
      toast.success("Portfolio Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePortfolio = createAsyncThunk(
  "Portfolio/updatePortfolio",
  async (
    { id, updatedPortfolioData, toast, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updatePortfolio(updatedPortfolioData, id);
      toast.success("Portfolio Updated Successfully");

      // Navigate one step back
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearPortfolio = createAction("Portfolio/clearPortfolio");

const PortfolioSlice = createSlice({
  name: "Portfolio",
  initialState: {
    Portfolio: {},
    Portfolios: [],
    allPortfolios: [], // Add this property

    userPortfolios: [],
    tagPortfolios: [],
    relatedPortfolios: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
    userPortfolioInfo: {},
    hasCreatedPortfolio: false, // New property to indicate whether the user has created their portfolio
    portfolios: [], // initialize with an empty array
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPortfolio.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.hasCreatedPortfolio = true;
        state.loading = false;
        state.portfolios = action.payload;
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(getPortfolios.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(clearPortfolio, (state) => {
        state.portfolio = {};
      })
      .addCase(getPortfolios.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : "Unknown error occurred";
      })
      .addCase(getPortfolio.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolio = action.payload;
      })

      .addCase(getPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })

      .addCase(getPortfoliosByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPortfoliosByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userPortfolios = action.payload;
        state.userPortfolioInfo =
          action.payload.find(
            (portfolio) => portfolio._id === state.user?.result?._id
          ) || {};

        // Set the hasCreatedPortfolio flag based on whether the user has portfolios
        state.hasCreatedPortfolio = action.payload.length > 0;
      })
      .addCase(getPortfoliosByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.messge
          : "Unknown error occurred";
      })

      .addCase(deletePortfolio.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userPortfolios = state.userPortfolios.filter(
            (item) => item._id !== id
          );
          state.hasCreatedPortfolio = state.userPortfolios.length > 1;

          // state.portfolios = state.portfolios.filter((item) => item._id !== id);
        }
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.messge
          : "Unknown error occurred";
      })
      .addCase(updatePortfolio.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userPortfolios = [action.payload];

          // state.userPortfolios = state.userPortfolios.map((item) =>
          //   item._id === id ? action.payload : item
          // );
          // state.portfolios = state.portfolios.map((item) =>
          //   item._id === id ? action.payload : item
          // );
        }
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.messge
          : "Unknown error occurred";
      });
  },
});
export const { setCurrentPage } = PortfolioSlice.actions;

export default PortfolioSlice.reducer;
