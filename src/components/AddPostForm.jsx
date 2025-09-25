/** @format */

import { useState } from "react";
import { useTranslation } from "react-i18next";

// toastifay
import { toast } from "react-toastify";

import { motion } from "framer-motion";

export default function AddPostForm({ onSubmit }) {
  // onSubmit is optional prop: async function(postData) { ... }
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { t } = useTranslation();

  const notify = () =>
    toast.success(t("The post has been added successfully"), {
      className: "toast-success",
    });

  const TITLE_MAX = 120;
  const CONTENT_MAX = 5000;

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (title.length > TITLE_MAX)
      e.title = `Title must be ≤ ${TITLE_MAX} characters`;
    if (!content.trim()) e.content = "Content is required";
    if (content.length > CONTENT_MAX)
      e.content = `Content must be ≤ ${CONTENT_MAX} characters`;
    if (!category) e.category = "Please choose a category";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(null);
    setImagePreview(null);

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Only image files allowed" }));
      return;
    }

    // Optional size limit (e.g., 5MB)
    const MAX_MB = 5;
    if (file.size > MAX_MB * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: `Image must be ≤ ${MAX_MB}MB` }));
      return;
    }

    setErrors((prev) => ({ ...prev, image: null }));
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      // Build payload
      const postData = {
        title: title.trim(),
        content: content.trim(),
        category,
        imageUrl: imageFile,
      };

      // If you want to upload image: either send FormData or use cloud storage then attach URL
      if (imageFile) {
        // Example: attach file object — consumer (onSubmit) should handle upload
        postData.imageFile = imageFile;
      }

      // If parent provided onSubmit handler, call it
      if (onSubmit) {
        await onSubmit(postData);
      } else {
        // Default behavior: log to console (replace with API call)
        console.log("Post data:", postData);
        // Example: await api.createPost(postData)
      }

      resetForm();
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "Submit failed",
      }));
    } finally {
      setSubmitting(false);
    }
    notify();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // start hidden & slightly down
      animate={{ opacity: 1, y: 0 }} // fade in & slide up
      exit={{ opacity: 0, y: -50 }} // fade out when leaving
      transition={{
        duration: 0.6,
        ease: "easeInOut", // smooth easing
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto mt-1.5 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-md p-6 sm:p-8"
        aria-label="Add post form"
      >
        <h3 className="text-xl font-semibold mb-4">{t("Create a Post")}</h3>

        {/* Title + char count */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            {t("Title")}
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={TITLE_MAX}
            placeholder="Enter a short descriptive title"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-between text-xs mt-1 text-gray-500">
            <span>
              {errors.title ? (
                <span className="text-red-500">{errors.title}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </span>
            <span>
              {title.length}/{TITLE_MAX}
            </span>
          </div>
        </div>

        {/* Category + responsive layout */}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="category"
            >
              {t("Category")}
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">{t("Select category")}</option>
              <option value="news">{t("News")}</option>
              <option value="tutorial">{t("Tutorial")}</option>
              <option value="announcement">{t("Announcement")}</option>
              <option value="other">{t("Other")}</option>
            </select>
            <div className="text-xs text-red-500 mt-1">{errors.category}</div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("Cover Image")} {t("optional")}
            </label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="image"
                className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer border border-gray-300 dark:border-gray-600 text-sm"
              >
                {t("Choose Image")}
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded border border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 rounded bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-500">
                  {t("No image")}
                </div>
              )}
            </div>
            <div className="text-xs text-red-500 mt-1">{errors.image}</div>
          </div>
        </div>

        {/* Content textarea */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="content">
            {t("Content")}
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            maxLength={CONTENT_MAX}
            placeholder="Write your post here..."
            className="w-full px-4 py-3  rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-between text-xs mt-1 text-gray-500">
            <span>
              {errors.content ? (
                <span className="text-red-500">{errors.content}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </span>
            <span>
              {content.length}/{CONTENT_MAX}
            </span>
          </div>
        </div>

        {/* Error / submit */}
        {errors.submit && (
          <div className="mb-4 text-sm text-red-500">{errors.submit}</div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="text-xs text-gray-500">
            {t(
              "Tip: use a short title and add an image to increase engagement."
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={resetForm}
              disabled={submitting}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:opacity-90"
            >
              {t("Reset")}
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? t("Submitting...") : t("Publish Post")}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
