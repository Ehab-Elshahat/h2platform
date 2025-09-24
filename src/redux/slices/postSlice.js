/** @format */
import { createSlice } from "@reduxjs/toolkit";

// تحميل البوستات من localStorage لو موجودة
const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: savedPosts,
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("posts", JSON.stringify(state.items));
    },
    removePost: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("posts", JSON.stringify(state.items));
    },
    editPost: (state, action) => {
      const { id, title, content, image } = action.payload;
      const post = state.items.find((item) => item.id === id);
      if (post) {
        post.title = title;
        post.content = content;
        if (image) post.image = image; // تحديث الصورة لو اتغيرت
      }
      localStorage.setItem("posts", JSON.stringify(state.items));
    },
  },
});

export const { addPost, removePost, editPost } = postSlice.actions;
export default postSlice.reducer;
