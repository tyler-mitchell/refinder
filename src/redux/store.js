import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "components/counter/counterSlice";
import createProductSlice from "./createProductSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    createProduct: createProductSlice,
    auth: authSlice,
    product: productSlice
  }
});
