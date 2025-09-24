/** @format */

import { createSlice } from "@reduxjs/toolkit";

const isAdminSlice = createSlice({
  name: "isAdmin",
  initialState: {
    isAdmin: false,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload; // true or false
    },
    resetAdmin: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { setAdmin, resetAdmin } = isAdminSlice.actions;
export default isAdminSlice.reducer;
