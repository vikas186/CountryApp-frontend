import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../src/slices/countrySlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});
