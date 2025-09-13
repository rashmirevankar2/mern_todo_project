# Backend (Express + MongoDB)
1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Start server: `npm run dev` (requires nodemon) or `npm start`
API endpoints:
- POST /api/auth/register { username, email, password }
- POST /api/auth/login { email, password } -> returns { token }
- Protected (Authorization: Bearer <token>):
  - POST /api/tasks
  - GET /api/tasks
  - PUT /api/tasks/:id
  - DELETE /api/tasks/:id
