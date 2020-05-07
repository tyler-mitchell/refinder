import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { useLocation, useParams } from "react-router-dom";

import { database, fieldValue } from "firebase/core";

export const discussionSlice = createSlice({
  name: "discussion",
  initialState: { recipientAvatar: null, recipientName: null },
  reducers: {
    initializeDiscussion: (state, action) => {
      console.log(`⭐: action`, action);
      const {
        userType,
        customerId,
        customerAvatar,
        customerName,
        ownerId,
        ownerAvatar,
        ownerName,
        uid,
      } = action.payload;
      if (uid === ownerId) {
        state.recipientAvatar = customerAvatar;
        state.recipientName = customerName;
        console.log(`⭐: customerName`, customerName);
      } else if (uid === customerId) {
        state.recipientAvatar = ownerAvatar;
        state.recipientName = ownerName;
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
});

export const selectFormData = (state) => state.counter.value;
export const {
  initializeDiscussion,
  setCurrentDiscussion,
  setUserType,
} = discussionSlice.actions;

export default discussionSlice.reducer;
