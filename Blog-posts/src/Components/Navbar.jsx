import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Slices/AuthSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Blog App
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">{user.name}</span>

          <button
            onClick={() => dispatch(logout())}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
