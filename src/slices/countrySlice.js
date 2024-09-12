import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

// Thunk for fetching countries with pagination and search capabilities
export const fetchCountries = createAsyncThunk(
  'country/searchCountries',
  async ({ page = 1, limit = 8, name = '' }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`, {
        params: { page, limit, name },
      });
      if (!response.data || !response.data.countries) {
        throw new Error('Unexpected response structure');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Thunk for fetching details of a single country by its code
export const fetchCountryDetails = createAsyncThunk(
  'country/getCountryDetails',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/alpha/${code}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    countryDetails: null,
    totalCountries: 0,
    page: 1,
    totalPages: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearCountryDetails: (state) => {
      state.countryDetails = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload.countries;
        state.totalCountries = action.payload.totalCountries;
        state.page = action.payload.currentPage; // Ensure currentPage from response is used
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCountryDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountryDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countryDetails = action.payload;
      })
      .addCase(fetchCountryDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCountryDetails, setPage } = countrySlice.actions;

export default countrySlice.reducer;
