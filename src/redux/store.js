import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "components/counter/counterSlice";
import createProductSlice from "./createProductSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import imageSlice from "./imageSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    createProduct: createProductSlice,
    auth: authSlice,
    product: productSlice,
    images: imageSlice
  },
  middleware: getDefaultMiddleware({
    serializabilityCheck: {
      ignoredActions: ["images.images"]
    }
  })
});
