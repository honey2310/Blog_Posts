import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.blog);

  const post = posts.find((p) => p.id === Number(id));

  if (!post)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        Post not found.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Image */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold mt-8 text-gray-900">{post.title}</h1>

      {/* Category & Date */}
      <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-400">
        {post.category && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        )}
        <span className="text-sm">{new Date(post.date).toLocaleDateString()}</span>
      </div>

      {/* Description */}
      <p className="mt-6 text-gray-700 text-lg leading-relaxed">{post.description}</p>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <Link
          to={`/edit/${post.id}`}
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition font-medium"
        >
          Edit Post
        </Link>
        <Link
          to="/"
          className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition font-medium"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
