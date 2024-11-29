import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
