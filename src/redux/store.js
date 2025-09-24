/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import postReducer from './slices/postSlice'
import isAdminReducer from './slices/isAdminSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    isAdmin: isAdminReducer,
  },
});

export default store;
