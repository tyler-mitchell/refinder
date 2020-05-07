import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import counterReducer from "components/counter/counterSlice";

import authSlice from "./authSlice";
import createProductSlice from "./createProductSlice";
import discussionSlice from "./discussionSlice";
import imageSlice from "./imageSlice";
import listingsSlice from "./listingsSlice";
import productSlice from "./productSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    createProduct: createProductSlice,
    auth: authSlice,
    product: productSlice,
    discussion: discussionSlice,
    images: imageSlice,
    listings: listingsSlice,
  },
  middleware: getDefaultMiddleware({
    serializabilityCheck: {
      ignoredActions: ["images.images"],
    },
  }),
});
