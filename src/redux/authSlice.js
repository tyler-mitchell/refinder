import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: null,
    userData: { displayName: null, uid: null, email: null, avatar: null },
  },
  reducers: {
    initializeUser: (state, action) => {
      const { userData, loggedIn } = action.payload;
      state.userData = userData;
      state.loggedIn = loggedIn;
      console.log(`⭐: state.userData`, state.uid);
    },
  },
});

export const selectUserData = (state) => state.auth.userData;
export const selectUserID = (state) => state.auth.userData.uid;
export const { initializeUser } = slice.actions;

export default slice.reducer;
