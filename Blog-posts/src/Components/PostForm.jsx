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

  // Wait until posts are loaded
  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPosts());
  }, [dispatch, posts.length]);

  // Populate form only when posts are loaded
  useEffect(() => {
    if (id && posts.length > 0) {
      const postToEdit = posts.find((p) => p.id === Number(id));
      if (postToEdit) setForm(postToEdit);
    }
  }, [id, posts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const postToUpdate = posts.find((p) => p.id === Number(id));
      if (!postToUpdate) return alert("Post not found!");

      // Merge existing post with form values
      const payload = { ...postToUpdate, ...form, id: Number(id) };

      await dispatch(updatePost(payload));
    } else {
      await dispatch(addPost(form));
    }

    navigate("/");
  };

  // Prevent form render if editing and posts not loaded yet
  if (id && posts.length === 0) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {id ? "Edit Post" : "Add New Post"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Post Description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {id ? "Update Post" : "Add Post"}
        </button>
      </form>
    </div>
  );
}
