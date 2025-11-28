import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/AuthSlice";

const store = configureStore({
  reducer: {
    blog: postReducer,
  },
});

export default store;
