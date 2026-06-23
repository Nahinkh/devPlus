# 🚀 DevPulse

DevPulse is a collaborative issue-tracking platform built for software development teams. It allows contributors to report bugs and feature requests while enabling maintainers to manage, update, and resolve issues efficiently.

---

## 🌐 Live API

**Backend URL:**
`https://dev-plus-iuc3h776u-nahinkhs-projects.vercel.app/`

---

## 📂 Repository

**GitHub Repository:**
`https://github.com/Nahinkh/devPlus`

---

## ✨ Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* HTTP-Only Cookie Support
* Role-Based Access Control

### 🐞 Issue Management

* Create New Issues
* View All Issues
* View Single Issue
* Update Existing Issues
* Delete Issues
* Manage Issue Status

### 🔍 Filtering & Sorting

* Sort by Newest
* Sort by Oldest
* Filter by Issue Type
* Filter by Issue Status

### 🛡️ Security

* Password Hashing with bcryptjs
* Protected Routes
* JWT Verification Middleware
* Centralized Error Handling

---

## 🛠️ Technology Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* Neon Database
* pg (Native PostgreSQL Driver)

### Authentication

* JSON Web Token (JWT)
* bcryptjs
* cookie-parser

### Deployment

* Vercel

---

## 📁 Project Structure

```text
src/
├── config/
├── db/
├── middleware/
├── modules/
│   ├── auth/
│   └── issues/
├── routes/
├── utils/
├── app.ts
└── index.ts
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Nahinkh/devPlus
cd devpulse
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_jwt_secret

NODE_ENV=development
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

### 5️⃣ Build the Project

```bash
npm run build
```

### 6️⃣ Start Production Server

```bash
npm start
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register User |
| POST   | `/api/auth/login`  | Login User    |

---

### Issues

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | `/api/issues`     | Create Issue     |
| GET    | `/api/issues`     | Get All Issues   |
| GET    | `/api/issues/:id` | Get Single Issue |
| PATCH  | `/api/issues/:id` | Update Issue     |
| DELETE | `/api/issues/:id` | Delete Issue     |

---

## 🔍 Query Parameters

### Sort Issues

```http
GET /api/issues?sort=newest
GET /api/issues?sort=oldest
```

### Filter by Type

```http
GET /api/issues?type=bug
GET /api/issues?type=feature_request
```

### Filter by Status

```http
GET /api/issues?status=open
GET /api/issues?status=in_progress
GET /api/issues?status=resolved
```

---

## 🗄️ Database Schema Summary

### Users Table

| Field      | Description                |
| ---------- | -------------------------- |
| id         | Auto Increment Primary Key |
| name       | Full Name                  |
| email      | Unique Email Address       |
| password   | Hashed Password            |
| role       | contributor / maintainer   |
| created_at | Created Timestamp          |
| updated_at | Updated Timestamp          |

---

### Issues Table

| Field       | Description                   |
| ----------- | ----------------------------- |
| id          | Auto Increment Primary Key    |
| title       | Issue Title                   |
| description | Detailed Description          |
| type        | bug / feature_request         |
| status      | open / in_progress / resolved |
| reporter_id | User ID of Reporter           |
| created_at  | Created Timestamp             |
| updated_at  | Updated Timestamp             |

---

## 👥 User Roles

### Contributor

* Register and Login
* Create Issues
* View Issues
* Update Own Issues (Only if Status is Open)

### Maintainer

* All Contributor Permissions
* Update Any Issue
* Delete Any Issue
* Change Issue Status
* Access System Metrics

---

## 📖 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Operation failed",
  "errors": {}
}
```

---

## 🚀 Deployment

This project is deployed on **Vercel** and uses **Neon PostgreSQL** as the database.

---

