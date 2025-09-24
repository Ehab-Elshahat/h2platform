/** @format */

import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";

function PostsListPage() {
  const posts = useSelector((state) => state.post.items);

  return (
    <div
      style={{ minHeight: "calc(-120px + 100vh)" }}
      className="max-w-7xl mx-auto px-6 py-4 flex items-start flex-wrap justify-between gap-6"
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsListPage;
