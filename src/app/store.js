import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/appSlice";
import searchSlice from "../features/searchSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
  },
});

export default store;
