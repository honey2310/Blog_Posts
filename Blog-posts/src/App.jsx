import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PostLogin from "./Components/PostLogin";
import PostList from "./Components/PostList";
import PostForm from "./Components/PostForm";
import PostDetails from "./Components/PostDetails";

import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

// ---------------- PRIVATE ROUTE ----------------
function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.blog);
  return user ? children : <Navigate to="/login" replace />;
}

// ------------------------------------------------

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<PostLogin />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PostList />
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <PostDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
