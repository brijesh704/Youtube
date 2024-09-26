import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/appSlice";
import searchSlice from "../features/searchSlice";
import chatSlice from "../features/chatSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    chat: chatSlice,
  },
});

export default store;
