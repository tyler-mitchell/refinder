import { configureStore } from "@reduxjs/toolkit";
import sellReducer from "./redux/sellSlice";
import counterReducer from "./components/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    createProduct: sellReducer
  }
});
