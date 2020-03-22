import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { database, fieldValue } from "firebase/core";
export const addToFirebase = createAsyncThunk(
  "createProduct/addToFirebase",
  async (test, { getState, requestId }) => {
    // const { currentRequestId, loading } = getState().users;
    const { uid, displayName, avatar } = getState().auth.userData;
    const formData = getState().createProduct.data;

    // if (loading !== "pending" || requestId !== currentRequestId) {
    //   return;
    // }
    const product = {
      uid,
      displayName,
      avatar,
      ...formData,
      created: fieldValue.serverTimestamp()
    };
    try {
      const res = await database.collection("materials").add(product);
    } catch (error) {}

    // const response = await userAPI.fetchById(userId)
    return uid;
    // return response.data
  }
);

export const createProductSlice = createSlice({
  name: "createProduct",
  initialState: {
    data: {},
    res: null
  },

  reducers: {
    addToForm: (state, action) => {
      const { formData } = action.payload;
      console.log(`⭐: formData`, formData);
      state.data = { ...state.data, ...formData };
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [addToFirebase.fulfilled]: (state, action) => {
      // Add user to the state array
      state.res = action.payload;
    }
  }
});

export const selectFormData = state => state.counter.value;
export const { increment, decrement, addToForm } = createProductSlice.actions;

export default createProductSlice.reducer;
