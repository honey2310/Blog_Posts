### 📘 React Blog App — README.md
## 📝 Project Overview

The React Blog App is a full-featured blogging platform built using React JS, Redux Toolkit, React Router, Bootstrap, and JSON Server.
It allows users to view, add, edit, delete, sort, and filter blog posts, along with a simple login authentication system.

This project is designed as part of the React JS Practical Exam.

## 🚀 Features
### 🧩 Core Features

View all blog posts

Add new blog posts
(title, description, date, image, category)

Edit existing posts

Delete posts

View post details

## 🔐 Authentication

User Login (using JSON Server /users endpoint)

Only authenticated users can:

Add posts

Edit posts

Delete posts

Protected routes (PrivateRoute)

### 🧮 Sorting & Filtering

Sort posts by:

Newest / Oldest

Popularity (optional)

Filter posts by:

Category

Author

### 🎨 UI/UX

Responsive layout using Bootstrap CSS

Clean navigation using a Navbar

Mobile-friendly components

📂 Project Structure
src/
 ├─ components/
 │   ├─ Navbar.jsx
 │   ├─ PostList.jsx
 │   ├─ PostForm.jsx
 │   ├─ PostDetails.jsx
 │   ├─ PrivateRoute.jsx
 │   ├─ PostLogin.jsx
 │
 ├─ redux/
 │   ├─ store.js
 │   ├─ Slices/
 │   │   ├─ AuthSlice.js
 │   │   ├─ PostSlice.js
 │
 ├─ App.js
 ├─ index.js

### 🛠️ Technologies Used

React JS

React Router DOM

Redux Toolkit

Redux Thunk

Bootstrap

JSON Server

Axios

## 🔧 Installation & Setup
1️⃣ Clone the Repository
cd blog-app

2️⃣ Install Dependencies
npm install

3️⃣ Start JSON Server

Inside the project root, create a file named db.json:

{
  "posts": [],
  "users": [
    {
      "id": 1,
      "email": "test@gmail.com",
      "password": "123456",
      "name": "John Doe"
    }
  ]
}


Run the server:

npx json-server --watch db.json --port 3000

4️⃣ Start React App
npm start

### 🔐 Authentication Logic

Login is handled by querying JSON Server:
If credentials match → login success
Else → login failed

Session is maintained using localStorage.

### ✨ Demo (Optional)


https://github.com/user-attachments/assets/d09f6fb3-9c38-4168-874d-5673d2371c31






