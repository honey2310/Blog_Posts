import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../Slices/AuthSlice";
import { Link } from "react-router-dom";

export default function PostList() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="px-6 py-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>

        <Link
          to="/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded-lg p-4 border"
            >
              <img
                src={post.image}
                className="w-full h-40 object-cover rounded"
                alt=""
              />

              <h2 className="text-xl font-bold mt-3">{post.title}</h2>

              <p className="text-gray-600 mt-1 line-clamp-3">
                {post.description}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                {post.date} • {post.category}
              </p>

              <div className="flex justify-between mt-4">
                <Link
                  to={`/post/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>

                <Link
                  to={`/edit/${post.id}`}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => dispatch(deletePost(post.id))}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
