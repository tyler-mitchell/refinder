import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { database, fieldValue } from "firebase/core";
export const addToFirebase = createAsyncThunk(
  "createProduct/addToFirebase",
  async (test, { getState, requestId }) => {
    // const { currentRequestId, loading } = getState().users;
    const { uid, displayName, avatar } = getState().auth.userData;
    const {
      data: formData,
      productDocId,
      productImages
    } = getState().createProduct;

    // if (loading !== "pending" || requestId !== currentRequestId) {
    //   return;
    // }
    const product = {
      uid,
      displayName,
      avatar,
      free: false,
      productImages,

      ...formData,
      created: fieldValue.serverTimestamp()
    };

    try {
      const res = await database
        .collection("materials")
        .doc(productDocId)
        .set(product);
      res
        .collection("product_discussion")
        .doc("discussion_info")
        .set({ ownerId: uid, productId: res.id, ownerName: displayName });
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
    res: null,
    productDocId: null,
    productImages: []
  },

  reducers: {
    addToForm: (state, action) => {
      const { formData } = action.payload;
      console.log(`⭐: formData`, formData);
      state.data = { ...state.data, ...formData };
    },
    addProductImage: (state, action) => {
      const { data } = action.payload;

      state.productImages.push(data);
    },
    setProductDocId: state => {
      state.productDocId = database.collection("materials").doc().id;
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
export const {
  increment,
  decrement,
  addToForm,
  setProductDocId,
  addProductImage
} = createProductSlice.actions;

export default createProductSlice.reducer;
