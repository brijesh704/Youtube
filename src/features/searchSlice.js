import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    initialState: {
      cache: {},
      currentQuery: "",
    },
  },
  reducers: {
    cacheResults: (state, action) => {
      state.cache = {
        ...state.cache,
        ...action.payload.cache,
      };
      if (action.payload.currentQuery) {
        state.currentQuery = action.payload.currentQuery;
      }
    },
  },
});

export const { cacheResults } = searchSlice.actions;

export default searchSlice.reducer;
