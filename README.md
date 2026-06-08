# assignment-1
# Notes App – Full Stack Application

A full-stack Notes Management Application built with **FastAPI**, **MySQL**, **SQLAlchemy**, **JWT Authentication**, **React**, and **Vite**.

## Features

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Create Notes
* View All Notes
* View Note by ID
* Update Notes
* Delete Notes
* User-specific Notes Access
* Protected Routes using JWT Tokens

---

## Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* MySQL
* Passlib (bcrypt)
* Python-Jose (JWT)
* Uvicorn

### Frontend

* React
* Vite
* JavaScript
* Fetch API

### Deployment

* Backend: Render
* Frontend: Vercel

---

## Project Structure

```text
project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── auth.py
├── database.py
├── database_models.py
├── main.py
├── models.py
├── requirements.txt
└── README.md
```

---

## Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

---

### 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate:

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

---

### 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=mysql+pymysql://username:password@localhost/database_name

SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

### 5. Start Backend

```bash
uvicorn main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

---

### 6. Setup Frontend

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Start frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint  | Description      |
| ------ | --------- | ---------------- |
| POST   | /register | Register User    |
| POST   | /login    | Login User       |
| GET    | /me       | Get Current User |

### Notes

| Method | Endpoint    |
| ------ | ----------- |
| POST   | /notes      |
| GET    | /notes      |
| GET    | /notes/{id} |
| PUT    | /notes/{id} |
| DELETE | /notes/{id} |

---

## Authentication Flow

1. User registers.
2. Password is hashed using bcrypt.
3. User logs in.
4. JWT token is generated.
5. Token is returned to frontend.
6. Frontend stores token.
7. Token is sent in Authorization header.

Example:

```text
Authorization: Bearer <jwt-token>
```

8. Backend validates token.
9. Protected routes become accessible.

---

## Backend Deployment (Render)

### Create Web Service

1. Push code to GitHub.
2. Login to Render.
3. Create New Web Service.
4. Connect GitHub repository.
5. Configure:

Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

### Environment Variables

Add in Render:

```env
DATABASE_URL=your-mysql-url
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Deploy service.

---

## Frontend Deployment (Vercel)

### Import Repository

1. Login to Vercel.
2. Click New Project.
3. Import GitHub Repository.

---

### Root Directory

If frontend is inside a folder:

```text
frontend
```

---

### Environment Variable

Add:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

Example:

```env
VITE_API_URL=https://assignment-1-9v19.onrender.com
```

---

### Build Settings

For Vite:

Build Command:

```bash
npm run build
```

Output Directory:

```bash
dist
```

Install Command:

```bash
npm install
```

Deploy.

---

## Live Demo

Frontend:

```text
https://your-vercel-app.vercel.app
```

Backend:

```text
https://assignment-1-9v19.onrender.com
```

---

## What I Learned

* FastAPI Fundamentals
* SQLAlchemy ORM
* Dependency Injection
* JWT Authentication
* Password Hashing with bcrypt
* REST API Design
* React Basics
* Frontend-Backend Integration
* Deployment with Render
* Deployment with Vercel
* Git and GitHub Workflow

---

## Author

Madhan Myana

GitHub:
https://github.com/Madhanmyana
