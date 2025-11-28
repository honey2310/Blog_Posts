import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost, fetchPosts } from "../Slices/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function PostForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.blog);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch posts if not loaded
  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
  }, [dispatch, posts.length]);

  // Initialize form if editing
  useEffect(() => {
    if (id && posts.length > 0) {
      setLoading(true);
      const postToEdit = posts.find((p) => p.id === Number(id));
      if (postToEdit) {
        setForm({
          title: postToEdit.title || "",
          description: postToEdit.description || "",
          date: postToEdit.date || "",
          image: postToEdit.image || "",
          category: postToEdit.category || "",
        });
      } else {
        alert("Post not found!");
        navigate("/");
      }
      setLoading(false);
    }
  }, [id, posts, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(updatePost({ ...form, id: Number(id) }));
      alert("Post updated successfully!");
    } else {
      const resultAction = await dispatch(addPost(form));
      alert("Post added successfully!");
      setForm({
        title: "",
        description: "",
        date: "",
        image: "",
        category: "",
      });
    }
    navigate("/");
  };

  if (id && loading) return <p className="text-center mt-20">Loading post...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-xl rounded-2xl p-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        {id ? "Edit Post" : "Add New Post"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <textarea
          name="description"
          placeholder="Post Description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          {id ? "Update Post" : "Add Post"}
        </button>
      </form>
    </div>
  );
}
