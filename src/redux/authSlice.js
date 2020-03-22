import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    userData: { displayName: null, uid: null, email: null, avatar: null }
  },
  reducers: {
    initializeUser: (state, action) => {
      const { userData } = action.payload;
      state.userData = userData;

      console.log(`⭐: state.userData`, state.uid);
    }
  }
});

export const selectUserData = state => state.auth.userData;
export const selectUserID = state => state.auth.userData.uid;
export const { initializeUser } = slice.actions;

export default slice.reducer;
