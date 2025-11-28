import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ------------------- LOGIN -------------------
export const loginUser = createAsyncThunk(
  "posts/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) return rejectWithValue("Invalid email or password");
    return user;
  }
);

// ------------------- FETCH POSTS -------------------
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const res = await fetch("http://localhost:3000/posts");
    return await res.json();
  }
);

// ------------------- ADD POST -------------------
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData) => {
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    return await res.json();
  }
);

// ------------------- UPDATE POST -------------------
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData) => {
    const res = await fetch(`http://localhost:3000/posts/${postData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    return await res.json();
  }
);

// ------------------- DELETE POST -------------------
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id) => {
    await fetch(`http://localhost:3000/posts/${id}`, { method: "DELETE" });
    return id;
  }
);

// ------------------- SLICE -------------------
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // FETCH POSTS
      .addCase(fetchPosts.pending, (state) => { state.loading = true; })
      .addCase(fetchPosts.fulfilled, (state, action) => { state.loading = false; state.posts = action.payload; })
      .addCase(fetchPosts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // ADD POST
      .addCase(addPost.fulfilled, (state, action) => { state.posts.push(action.payload); })

      // UPDATE POST
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })

      // DELETE POST
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      });
  },
});

export const { logout } = postSlice.actions;
export default postSlice.reducer;
