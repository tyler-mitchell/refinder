import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { useLocation, useParams } from "react-router-dom";

import { database, fieldValue } from "firebase/core";

export const sendMessage = createAsyncThunk(
  "product/sendMessage",
  async (data, thunkAPI) => {
    const { uid, displayName, avatar } = thunkAPI.getState().auth.userData;
    const {
      ownerId,
      productId,

      title,
      userType,
      displayName: ownerName,
      currentDiscussionId,
    } = thunkAPI.getState().product;
    console.log(`⭐: currentDiscussionId`, currentDiscussionId);
    console.log(`⭐: productId`, productId);

    console.log(`⭐: ownerId`, ownerId);
    const { message, pricePoint } = data;

    console.log(`⭐: ownerId === uid`, ownerId === uid);

    const { discussionId, ...discussionData } =
      userType === "seller"
        ? {
            ownerId: uid,
            ownerName: displayName,
            ownerAvatar: avatar,
            discussionId: currentDiscussionId,
            title,
            productId,
            pricePoint: pricePoint || 0,
          }
        : {
            customerId: uid,
            title,
            customerName: displayName,
            customerAvatar: avatar,
            discussionId: uid,
            productId,
          };
    console.log(`⭐: uid`, uid);
    console.log(`⭐: currentDiscussionId`, currentDiscussionId);
    console.log(`⭐: message`, message);

    const messageData = {
      senderId: uid,
      senderName: displayName,
      senderAvatar: avatar,
      messageType: "basic",
      message: message,
      created: Date.now(),
    };

    try {
      const productDocRef = database.doc(`materials/${productId}`);

      // await productDocRef.doc(uid).update(messageData);
      await productDocRef
        .collection("product_discussion")
        .doc(discussionId)
        // .set(messageData);
        .set(
          {
            ownerId,
            ...discussionData,
            messages: fieldValue.arrayUnion(messageData),
          },
          { merge: true }
        );

      console.log(`⭐: MESSAGE SUCCESS`);
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
    error: null,
    currentDiscussionId: null,
    userType: "buyer",
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
        uid: ownerId,
        currentUserId,
      } = action.payload;

      state.displayName = displayName;
      state.title = title;
      state.description = description;
      state.avatar = avatar;

      state.productId = productId;
      state.ownerId = ownerId;

      if (state.ownerId === currentUserId) {
        state.userType = "seller";
      } else {
        state.userType = "buyer";
        state.currentDiscussionId = currentUserId;
      }
    },
    setCurrentDiscussion: (state, action) => {
      const { currentDiscussionId, userType } = action.payload;
      state.currentDiscussionId = currentDiscussionId;
      state.userType = userType;
    },
    setUserType: (state, action) => {
      const userType = action.payload;
      state.userType = userType;
    },
  },

  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [sendMessage.loading]: (state, action) => {
      console.log(`⭐: state`, state);

      // Add user to the state array
      state.loading = false;
    },
  },
});

export const selectFormData = (state) => state.counter.value;
export const {
  initializeProduct,
  setCurrentDiscussion,
  setUserType,
} = productSlice.actions;

export default productSlice.reducer;
