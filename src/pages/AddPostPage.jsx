/** @format */

import React from "react";
import AddPostForm from "../components/AddPostForm";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/slices/postSlice";


const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function AddPostPage() {
  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    let imageBase64 = null;

    if (data.imageFile) {
      imageBase64 = await toBase64(data.imageFile);
    }
    const newPost = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      category: data.category,
      imageUrl: imageBase64,
    };
    dispatch(addPost(newPost))
  };

  return (
    <div>
      <AddPostForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddPostPage;
