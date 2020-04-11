import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "components/counter/counterSlice";
import createProductSlice from "./createProductSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import imageSlice from "./imageSlice";
import listingsSlice from "./listingsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    createProduct: createProductSlice,
    auth: authSlice,
    product: productSlice,
    images: imageSlice,
    listings: listingsSlice,
  },
  middleware: getDefaultMiddleware({
    serializabilityCheck: {
      ignoredActions: ["images.images"],
    },
  }),
});
