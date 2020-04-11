import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { database, fieldValue } from "firebase/core";
import { useParams, useLocation } from "react-router-dom";

export const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    loading: false,
    error: null,
    listings: [],
    mapLocation: {
      latitude: 29.4087,
      longitude: -98.5011,
    },
  },
  reducers: {
    initializeListings: (state, action) => {
      const { listings } = action.payload;
      state.loading = false;

      state.listings = listings;
    },
    setMapLocation: (state, action) => {
      const { location } = action.payload;
      state.mapLocation = location;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const selectFormData = (state) => state.counter.value;
export const {
  initializeListings,
  setLoading,
  setMapLocation,
} = listingsSlice.actions;

export default listingsSlice.reducer;
