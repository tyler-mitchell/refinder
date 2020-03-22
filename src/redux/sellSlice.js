import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { database } from "firebase/core";
const createProduct = createAsyncThunk(
  "createProduct/create",
  async (userId, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().users;
    database.collection("materials");
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    // const response = await userAPI.fetchById(userId)
    // return response.data
  }
);

export const createProductSlice = createSlice({
  name: "createProduct",
  initialState: {
    data: {}
  },

  reducers: {
    // increment: state => {
    //   // Redux Toolkit allows us to 'mutate' the state. It doesn't actually
    //   // mutate the state because it uses the immer library, which detects
    //   // changes to a "draft state" and produces a brand new immutable state
    //   // based off those changes
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },

    addToForm: (state, action) => {
      const { formData } = action.payload;
      console.log(`⭐: formData`, formData);
      state.data = { ...state.data, ...formData };

      console.log(`⭐: state`, state);
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [createProduct.fulfilled]: (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload);
    }
  }
});

export const selectCount = state => state.counter.value;
export const { increment, decrement, addToForm } = createProductSlice.actions;

export default createProductSlice.reducer;
