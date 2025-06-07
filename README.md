# 🛒 E-Commerce Interest Selection App

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) project where users can sign up, verify OTP, log in, and manage category-based interests. The project features protected routes, real-time selection, and Redux for state management.

---

## 🚀 Features

- ✅ User Signup with validation
- ✅ OTP verification (simulated)
- ✅ Login with JWT authentication
- ✅ Protected Category page
- ✅ Add/Remove interests (saved to MongoDB)
- ✅ Redux-based global state management
- ✅ Toast notifications for feedback
- ✅ Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (Authentication)
- CORS
- dotenv
- hpp
- helmet

---

## 📁 Folder Structure
├── Frontend
│ ├── components
│ ├── pages
│ ├── redux
│ ├── services
│ └── App.jsx
│
└── Backend
├── controllers
├── model
├── routes
├── config
└── index.js


---

## 🔐 Authentication Flow

1. **Signup**
   - Validates user data
   - On success → OTP Page

2. **OTP Verification**
   - Verifies user (simulated logic)
   - On success → Login

3. **Login**
   - Authenticates user
   - Stores token + user data in Redux + localStorage

4. **Category Page (Protected)**
   - Fetches categories from DB
   - Allows add/remove interests
   - Sends updates to backend via API
   - Pagination supported



