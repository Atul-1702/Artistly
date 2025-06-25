import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
const store = configureStore({
  reducer: {
    filterSlice,
  },
});

export default store;
