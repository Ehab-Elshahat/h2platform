/** @format */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost, removePost } from "../redux/slices/postSlice";
import { useTranslation } from "react-i18next";

export default function PostCard({ post }) {

      const { t } = useTranslation();
  

    const isAdmin = useSelector((state) => state.isAdmin.isAdmin);


  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category || "");

  const handleSave = () => {
    dispatch(editPost({ id: post.id, title, content, category }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removePost(post.id));
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition w-xl ">
      {/* Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        {isEditing ? (
          <>
            {/* Editable form */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2  text-white"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2 text-white"
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2 text-white"
              placeholder="Category"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                {t("Save")}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
              >
                {t("Cancel")}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Normal view */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 l-h ">
              {post.content}
            </p>
            {post.category && (
              <span className="inline-block mt-3 px-4 py-2 bg-blue-300 text-blue-800 text-xs font-medium rounded">
                {post.category}
              </span>
            )}
            {isAdmin ? (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-white bg-blue-800 hover:bg-blue-600 text-sm rounded cursor-pointer px-3 py-1"
                >
                  {t("Edit")}
                </button>
                <button
                  onClick={handleDelete}
                  className="text-white bg-red-800  hover:bg-red-600 text-sm rounded px-3 py-1 cursor-pointer "
                >
                  {t("Delete")}
                </button>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}
