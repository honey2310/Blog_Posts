import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost, fetchPosts } from "../Slices/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function PostForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => state.blog);

  const existingPost =
    posts?.length > 0 ? posts.find((p) => p.id === Number(id)) : null;

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  useEffect(() => {
    if (existingPost) {
      setForm(existingPost);
    }
  }, [existingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // EDIT MODE
      dispatch(updatePost({ ...form, id: Number(id) }));
    } else {
      // ADD MODE
      dispatch(addPost(form));
    }

    navigate("/");
  };

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
        />

        <textarea
          name="description"
          placeholder="Post Description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
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
          placeholder="Category (e.g. Tech, Travel)"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
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
