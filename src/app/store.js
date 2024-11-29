import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/appSlice";
import searchSlice from "../features/searchSlice";
import chatSlice from "../features/chatSlice";
import userSlice from "../features/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
    search: searchSlice,
    chat: chatSlice,
  },
});

export default store;
