import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountryDetails = createAsyncThunk(
  'detailedCountry/getCountryDetails',
  async (code) => {
    const response = await axios.get(`http://localhost:4000/api/alpha/${code}`);
    return response.data;
  }
);

const detailedCountrySlice = createSlice({
  name: 'detailedCountry',
  initialState: {
    country: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountryDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.country = action.payload[0];
      })
      .addCase(fetchCountryDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default detailedCountrySlice.reducer;
