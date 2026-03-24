# Realtime Chat App

### A realtime chat application that supports 1-1 and group messaging with instant data synchronization, user authentication, and role-based access control.

## Screenshots
<img width="1920" height="1077" alt="image" src="https://github.com/user-attachments/assets/21ff3eb3-d944-4148-ab99-a2c71c5235f2" />


## Features

### UI

- Responsive
- Theme dark/light

### User Authentication

- Sign up, log in with secure password hashing (bcrypt)
- Update user profile
- Unique username verification

### Realtime Messaging

- Send and receive messages instantly in 1-1 or group chats
- Last message preview and timestamps

### Group Management

- Create group conversations
- Add/remove participants
- Owner role assignment and transfer
- Leave or delete groups with real-time notifications

### Realtime Status

- Online/offline user status tracking

### Socket Events

- Notifications for new messages, conversation updates, and participant changes

## Tech Stack

### Monorepo & Package Management

- Node.js – JavaScript runtime
- npm – package manager with workspaces
- Turbo – monorepo task running and caching
- TypeScript – static typing across backend, frontend, and shared packages

### Backend

- Node.js + Express – server framework
- Prisma ORM – database modeling and querying
- PostgreSQL – relational database
- bcrypt – password hashing
- jsonwebtoken – authentication via JWT
- Socket.IO – realtime messaging and notifications
- Zod – input validation and schema parsing
- dotenv – environment variable management

### Frontend

- React – UI library
- React Router DOM – client-side routing
- TailwindCSS – utility-first CSS framework
- Shadcn UI – component library
- Zustand – state management
- TanStack React Query – server state management
- Socket.IO Client – realtime communication
- Axios – HTTP requests
- Zod – frontend input validation

### Shared Package

- @realtime-chat-app/shared – shared types, validation schemas, and utilities
- Zod – consistent validation across frontend and backend

## Project Structure

```text

├── apps/               # Main applications
│   ├── backend/        # Node.js & Express API
│   └── frontend/       # React & Tailwind CSS web app
├── packages/           # Internal shared packages
|   └── shared/         # Shared types & validation schemas
```

## Getting Started

### Requirements

- Node.js
- npm
- PostgreSQL database (a cloud-hosted database is recommended)

### 1. Clone the project

```bash
git clone https://github.com/nguyenhuybinh270709/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configuration

#### Backend:

Copy the example environment file and update it with your credentials:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Update in .env:

- DATABASE_URL → your database connection string
- JWT_SECRET → any secret string for JWT authentication

#### Frontend

Copy the example environment file:

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

### 4 Database Setup

Sync your Prisma schema with the database:

```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev
```

### 5. Build project

```bash
npm run build
```

### 6. Run project (development mode)

```bash
npm run dev
```

This will start all packages (backend, frontend, and shared) via Turbo in development mode.

## Environment Variables Reference

### Backend (apps/backend/.env)

- PORT= 3000
- DATABASE_URL – PostgreSQL connection string
- JWT_SECRET – secret string for JWT authentication
- NODE_ENV=development
- FRONTEND_URL="http://localhost:5173"

### Frontend (apps/frontend/.env)

- VITE_API_URL="http://localhost:3000/api"
- VITE_BACKEND_URL="http://localhost:3000"
