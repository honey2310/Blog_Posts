import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.blog);

  const post = posts.find((p) => p.id === Number(id));

  if (!post)
    return <p className="text-center mt-20 text-gray-600">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">

      <img src={post.image} alt="" className="w-full rounded-lg shadow" />

      <h1 className="text-4xl font-bold mt-6">{post.title}</h1>

      <p className="text-gray-500 mt-2">
        {post.date} • {post.category}
      </p>

      <p className="text-lg text-gray-700 mt-4 leading-relaxed">
        {post.description}
      </p>

      <Link
        to={`/edit/${post.id}`}
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        Edit Post
      </Link>
    </div>
  );
}
