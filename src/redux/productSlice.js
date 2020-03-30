import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { database, fieldValue } from "firebase/core";
import { useParams, useLocation } from "react-router-dom";
export const sendMessage = createAsyncThunk(
  "product/sendMessage",
  async (data, thunkAPI) => {
    const { uid, displayName, avatar } = thunkAPI.getState().auth.userData;
    const {
      ownerId,
      productId,
      displayName: ownerName
    } = thunkAPI.getState().product;
    console.log(`⭐: productId`, productId);

    const discussionId = ownerId === uid ? "FadDLgDk0VVuBtv0CXeIjUnIWgP2" : uid;
    const { message } = data;
    console.log(`⭐: message`, message);
    const discussionData = {
      ownerId,
      ownerName,
      productId
    };
    const messageData = {
      senderId: uid,
      senderName: displayName,
      senderAvatar: avatar,
      messageType: "basic",
      message: message,
      createdAt: Date.now()
    };

    try {
      const productDocRef = database.doc(`materials/${productId}`);

      console.log(`⭐: productDocRef`, productDocRef);
      // await productDocRef.doc(uid).update(messageData);
      await productDocRef
        .collection("product_discussion")
        .doc(discussionId)
        // .set(messageData);
        .set(
          { ...discussionData, messages: fieldValue.arrayUnion(messageData) },
          { merge: true }
        );
    } catch (error) {
      console.log(`⭐: error`, error);
      return error;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null
  },
  reducers: {
    initializeProduct: (state, action) => {
      const {
        created,
        displayName,
        title,
        description,
        avatar,
        productId,
        uid
      } = action.payload;

      // state.created = created;
      state.displayName = displayName;
      state.title = title;
      state.description = description;
      state.avatar = avatar;
      state.productId = productId;
      state.ownerId = uid;

      console.log(`⭐: state`, state);
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [sendMessage.loading]: (state, action) => {
      console.log(`⭐: state`, state);

      // Add user to the state array
      state.loading = false;
    }
  }
});

export const selectFormData = state => state.counter.value;
export const { initializeProduct } = productSlice.actions;

export default productSlice.reducer;
