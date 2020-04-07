import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { database, fieldValue } from "firebase/core";
import fbMultiImageUpload from "firebase/fbMultiUpload";
export const addToFirebase = createAsyncThunk(
  "createProduct/addToFirebase",
  async (productImages, { getState, requestId }) => {
    // const { currentRequestId, loading } = getState().users;

    const { uid, displayName, avatar } = getState().auth.userData;
    const { data: formData, productDocId } = getState().createProduct;

    const product = {
      uid,
      displayName,
      avatar,
      free: false,
      productImages,
      ...formData,
      created: fieldValue.serverTimestamp(),
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
    } catch (error) {
      console.log(`⭐: error`, error);
    }

    return uid;
  }
);

const initialState = {
  data: {},
  res: null,
  uploading: false,
  error: false,
  productDocId: null,
  finished: false,
  productImages: [],
};

export const createProductSlice = createSlice({
  name: "createProduct",
  initialState: initialState,
  reducers: {
    addToForm: (state, action) => {
      const { formData } = action.payload;
      console.log(`⭐: formData`, formData);
      state.data = { ...state.data, ...formData };
    },
    addProductImage: (state, action) => {
      const { data } = action.payload;
      state.productImages = data;
    },
    setProductDocId: (state) => {
      state.productDocId = database.collection("materials").doc().id;
    },
    resetCreateProductState: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [addToFirebase.fulfilled]: (state, action) => {
      state.uploading = false;
      state.error = false;
      state.finished = true;
    },
    [addToFirebase.pending]: (state, action) => {
      state.uploading = true;
    },
    [addToFirebase.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

export const selectFormData = (state) => state.counter.value;
export const {
  increment,
  decrement,
  addToForm,
  setProductDocId,
  addProductImage,
  resetCreateProductState,
} = createProductSlice.actions;

export default createProductSlice.reducer;
