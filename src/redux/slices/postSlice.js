/** @format */
import { createSlice } from "@reduxjs/toolkit";

// src/data/postsData.js

const postsData = [
  {
    id: "1",
    title: "Getting Started with React",
    content:
      "React is a popular JavaScript library for building user interfaces. In this post, we will explore the basics of components, props, and state to help you get started quickly.",
    category: "React",
    imageUrl: "https://placehold.co/600x400?text=React+Basics",
  },
  {
    id: "2",
    title: "Mastering Redux Toolkit",
    content:
      "Redux Toolkit makes managing state in your applications much simpler. Learn how to configure slices, dispatch actions, and connect your store to React components.",
    category: "Redux",
    imageUrl: "https://placehold.co/600x400?text=Redux+Toolkit",
  },
  {
    id: "3",
    title: "Tailwind CSS for Developers",
    content:
      "Tailwind CSS is a utility-first CSS framework packed with classes. This post covers how to use it to quickly design responsive and modern UIs without writing custom CSS.",
    category: "CSS",
    imageUrl: "https://placehold.co/600x400?text=Tailwind+CSS",
  },
  {
    id: "4",
    title: "Introduction to Firebase",
    content:
      "Firebase provides a suite of tools including authentication, Firestore, and hosting. Learn how to integrate Firebase into your React project to handle backend tasks easily.",
    category: "Firebase",
    imageUrl: "https://placehold.co/600x400?text=Firebase",
  },
  {
    id: "5",
    title: "Optimizing React Performance",
    content:
      "Performance is key to a great user experience. Discover techniques like memoization, lazy loading, and code splitting to make your React apps run smoothly.",
    category: "Performance",
    imageUrl: "https://placehold.co/600x400?text=Performance",
  },
];
localStorage.setItem("posts", JSON.stringify(postsData))
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
