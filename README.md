## Run Locally

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

- Backend: Copy .env.example and update your DATABASE_URL (with your hosted connection string), JWT_SECRET (with any string)

```bash
    cp apps/backend/.env.example apps/backend/.env
```

- Frontend: Copy .env.example

```bash
    cp apps/frontend/.env.example apps/frontend/.env
```

### 4 Database Setup

- Once your DATABASE_URL is set, sync your schema with the database:

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
