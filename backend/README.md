# AuthVault Backend

Production-ready Node.js + Express + MongoDB authentication backend.

## Setup

```bash
cd backend
npm install
```

## Environment

Create a `.env` file:

```
PORT=5000
MONGO_URI=
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d
```

## Run

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint           | Auth | Role  | Description         |
|--------|-------------------|------|-------|---------------------|
| POST   | /api/auth/register | No   | —     | Create new account  |
| POST   | /api/auth/login    | No   | —     | Login, get JWT      |
| GET    | /api/auth/me       | Yes  | —     | Get current user    |
| GET    | /api/admin/users   | Yes  | admin | List all users      |

## Folder Structure

```
backend/
├── config/
│   └── db.js           # MongoDB connection
├── controllers/
│   ├── authController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js          # JWT verification
│   └── roleCheck.js     # Role-based access
├── models/
│   └── User.js          # Mongoose User model
├── routes/
│   ├── authRoutes.js
│   └── adminRoutes.js
├── .env.example
├── package.json
└── server.js
```
