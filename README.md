# Postaway Social Media API

A RESTful social media API built with **Node.js, Express.js, and ES6 Modules**. The API supports user authentication, posts, media uploads, likes, comments, pagination, filtering, sorting, drafts, and archived posts.

## 🚀 Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Create, read, update, and delete posts
- Image/video uploads using Multer
- Like/unlike posts
- Add, update, and delete comments
- Caption-based post filtering
- Sort posts by date or engagement
- Pagination for posts and comments
- Draft and archived post status
- Custom error handling
- Winston request logging
- In-memory data management

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **JavaScript / ES6 Modules**
- **JSON Web Token (JWT)**
- **bcryptjs**
- **Multer**
- **Winston**
- **dotenv**

## 📁 Project Structure

```text
src/
├── controllers/
├── middlewares/
├── models/
├── routes/
└── utils/
server.js
package.json
.env
uploads/
```

- **Models** – In-memory data operations
- **Controllers** – Application/business logic
- **Routes** – API endpoint definitions
- **Middlewares** – Authentication, logging, uploads, and errors
- **Utils** – Reusable utilities

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/postaway-social-media-api.git
cd postaway-social-media-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
JWT_SECRET=your_secure_jwt_secret
```

| Variable     | Description                                   |
| ------------ | --------------------------------------------- |
| `PORT`       | Port used by the Express server               |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens |

**Do not commit `.env` to GitHub.**

Add the following to `.gitignore`:

```gitignore
node_modules/
.env
application.log
uploads/*
!uploads/.gitkeep
```

## ▶️ Run the Project

### Development

```bash
npm run dev
```

### Start

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

## 🔐 Authentication

Register and login using:

```text
POST /api/signup
POST /api/signin
```

Login returns a JWT token. Use the token for protected routes:

```http
Authorization: Bearer <JWT_TOKEN>
```

User authentication routes are public. Post, comment, and like routes require authentication.

## 📡 API Endpoints

### Users

| Method | Endpoint      | Description     |
| ------ | ------------- | --------------- |
| POST   | `/api/signup` | Register a user |
| POST   | `/api/signin` | Login           |

### Posts

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/posts/all` | Get all published posts |
| GET    | `/api/posts`     | Get user's posts        |
| GET    | `/api/posts/:id` | Get a specific post     |
| POST   | `/api/posts`     | Create a post           |
| PUT    | `/api/posts/:id` | Update a post           |
| DELETE | `/api/posts/:id` | Delete a post           |

### Comments

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/comments/:id` | Get post comments |
| POST   | `/api/comments/:id` | Add a comment     |
| PUT    | `/api/comments/:id` | Update a comment  |
| DELETE | `/api/comments/:id` | Delete a comment  |

### Likes

| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| GET    | `/api/likes/:postid`        | Get post likes     |
| GET    | `/api/likes/toggle/:postid` | Like/unlike a post |
| DELETE | `/api/likes/:postid`        | Remove a like      |

## 🔎 Post Queries

Filter posts:

```text
GET /api/posts/all?caption=node
```

Sort by date:

```text
GET /api/posts/all?sort=date
```

Sort by engagement:

```text
GET /api/posts/all?sort=engagement
```

Pagination:

```text
GET /api/posts/all?page=1&limit=10
```

Queries can be combined:

```text
GET /api/posts/all?caption=node&sort=engagement&page=1&limit=10
```

## 📤 Media Uploads

Posts support image/video uploads using `multipart/form-data`.

Use the field:

```text
media
```

Supported formats include:

```text
JPG, JPEG, PNG, GIF, WEBP, MP4
```

Maximum file size: **10 MB**

Uploaded files are stored in the `uploads/` directory and served through:

```text
/uploads/<filename>
```

## ⚠️ Error Handling

The API uses a custom `CustomError` class and centralized error-handling middleware.

Example:

```json
{
  "success": false,
  "message": "Post not found"
}
```

Unexpected server errors return HTTP `500`.

## 📝 Logging

Winston logs the request URL and request body for application routes. Logs are written to `application.log` and the console.

Authentication routes (`signup` and `signin`) are excluded from request logging.

## 💾 Data Storage

The project uses **in-memory JavaScript data structures** for users, posts, comments, and likes.

> Data is reset whenever the server restarts. This is intentional for this project and can later be replaced with a database such as MongoDB or PostgreSQL.

## 📌 Future Improvements

- Database persistence
- User profiles and follow system
- Bookmarks
- Notifications
- Refresh tokens
- API documentation with Swagger
- Automated tests
- Cloud media storage
- Frontend application
