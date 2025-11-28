import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../Slices/AuthSlice";
import { Link } from "react-router-dom";

export default function PostList() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blog);

  const [sortOption, setSortOption] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const uniqueCategories = useMemo(() => {
    const categories = posts.map((p) => p.category?.trim());
    return [...new Set(categories)].filter(Boolean);
  }, [posts]);

  const filteredPosts = posts.filter((post) => {
    if (!filterCategory) return true;
    return post.category?.toLowerCase() === filterCategory.toLowerCase();
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === "title-asc") return a.title.localeCompare(b.title);
    if (sortOption === "title-desc") return b.title.localeCompare(a.title);
    if (sortOption === "date-new") return new Date(b.date) - new Date(a.date);
    if (sortOption === "date-old") return new Date(a.date) - new Date(b.date);
    return 0;
  });

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">
          Blog Posts
        </h1>
        <Link
          to="/add"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          + Add New Post
        </Link>
      </div>

      {/* Sorting + Filtering */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
        <select
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="title-asc">Title A → Z</option>
          <option value="title-desc">Title Z → A</option>
          <option value="date-new">Newest First</option>
          <option value="date-old">Oldest First</option>
        </select>
      </div>

      {/* Posts */}
      {sortedPosts.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-16">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-5 flex flex-col"
            >
              <div className="overflow-hidden rounded-lg h-48 mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>

              <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                <span>{post.category}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <Link
                  to={`/post/${post.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${post.id}`}
                  className="text-green-600 hover:underline font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(deletePost(post.id))}
                  className="text-red-600 hover:underline font-medium"
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
