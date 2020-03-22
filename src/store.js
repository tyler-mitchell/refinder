import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/counter/counterSlice";
import createProductSlice from "./redux/createProductSlice";
import authSlice from "./redux/authSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    createProduct: createProductSlice,
    auth: authSlice
  }
});
