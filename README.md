# Employee Management System (Backend API)

This is the backend of a secure full-stack Employee Management System that allows registered users to log in, view their profile, and manage employee records.

---

## 🔧 Tech Stack

**Server:** Node.js, Express.js  
**Database:** MySQL  
**Auth:** JSON Web Token (JWT)  
**File Upload:** Multer  
**Middleware:** Custom JWT and upload validators

---

## 🚀 Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/employee-management-backend
cd employee-management-backend/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create MySQL DB

Import this schema:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  photo VARCHAR(255),
  name VARCHAR(100),
  mobile VARCHAR(15),
  email VARCHAR(100),
  designation VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100),
  deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 4. Start the server

```bash
node server.js
```

Server runs on [http://localhost:8000](http://localhost:8000)

---

## 🔐 Environment Variables

You can create a `.env` file (or hardcode temporarily) with:

```env
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME

JWT_SECRET
```

---

## 📦 API Reference

### ✅ Auth Routes (prefix: `/api/auth`)

#### Register User

```http
POST /api/auth/register
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login User

```http
POST /api/auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get User Profile

```http
GET /api/auth/profile
```

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

---

### 👨‍💼 Employee Routes (prefix: `/api/employee`)

All routes require `Authorization: Bearer <token>`

#### Add Employee

```http
POST /api/employee/addEmployee
```

**Form Data:**

- `name` (string)
- `email` (string)
- `mobile` (string)
- `designation` (string)
- `city` (string)
- `state` (string)
- `photo` (file, optional)

#### Get All Employees (non-deleted)

```http
GET /api/employee/getEmployees
```

#### Update Employee

```http
PUT /api/employee/updateEmployee/:id
```

**Form Data:** (same as Add)

#### Soft Delete Employee

```http
DELETE /api/employee/deleteEmployee/:id
```

---

## 📁 File Uploads

Uploaded images are stored in `/uploads/`  
They can be accessed via:

```http
GET http://localhost:8000/uploads/<filename>
```

---

## 👨‍💻 Author

- [@shailendra-k1245](https://github.com/yourgithub)

---
