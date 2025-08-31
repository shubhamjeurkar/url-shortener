# 🔗 URL Shortener API

A production-ready URL Shortener built with **Node.js, Express.js, and MongoDB**.  
Features secure authentication, request validation, rate limiting, and API documentation via Swagger.

---

## 🚀 Features

- Shorten long URLs into unique short codes
- Redirect to original URL when short link is accessed
- **JWT Authentication** for protected routes
- **Swagger API Documentation** for easy testing
- **Helmet.js** for security headers
- **Rate Limiting** to prevent abuse
- Centralized **error handling middleware**
- **Mongoose ODM** for MongoDB

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JWT (JSON Web Token)
- **Docs:** Swagger UI
- **Security:** Helmet, CORS, Express Rate Limiter

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file and add the following:**
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

---

## 📚 API Documentation

Once the server is running, open Swagger docs at:  
👉 **http://localhost:3000/api-docs**

### Example Endpoints

- `POST /api/v1/urls` → Create short URL
- `GET /:shortCode` → Redirect to original URL
- `DELETE /api/v1/urls/:id` → Delete URL

---

## 🌐 Live Demo

**Deployed on Render** → [Swagger Docs](https://your-app-url.render.com/api-docs)

---

## 🧑‍💻 Author

**Shubham Jeurkar**  
- [LinkedIn](https://linkedin.com/in/your-profile)
- [GitHub](https://github.com/your-username)
