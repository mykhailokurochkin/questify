# Questify | Full-Stack Quiz Builder

A modern, premium Quiz Builder application built with **Next.js**, **NestJS**, and **Prisma**.

## 🚀 Features

- **Dynamic Quiz Creation**: Add, remove, and configure questions with real-time validation.
- **Multiple Question Types**:
  - **Boolean**: Simple True/False questions.
  - **Input**: Short text answer format.
  - **Checkbox**: Multiple choice questions with custom options.
- **Quiz Management**: View a comprehensive dashboard of all quizzes with the ability to delete them via a custom modal.
- **Read-only Details**: Inspect the structure of any quiz in a clean, focused view.
- **Premium UI**: Dark mode support, smooth transitions, and modern aesthetics using Tailwind CSS.

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **State/Forms**: React Hook Form, Zod
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Feedback**: Sonner (Toast notifications)

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: SQLite (via Prisma ORM)
- **Architecture**: Controller/Service pattern

## 📦 Project Structure

```
questify/
├── backend/         # NestJS application (API)
├── frontend/        # Next.js application (UI)
└── README.md        # Documentation
```

## 🏁 Getting Started

### Prerequisites

- **Node.js**: v18 or newer (tested on v19.9.0)
- **npm**: v9 or newer

### Quick Start (Prepare in one command)

The project is configured to run both the frontend and backend simultaneously.

1. **Setup & Install**:
This will install all dependencies, generate Prisma client, and initialize the database.
```bash
npm run setup
```

2. **Run Development Server**:
```bash
npm run dev
```

The application will be available at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### Manual Setup

If you prefer to run services individually:

#### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 Usage

1. **Dashboard**: Navigate to `/quizzes` to see all existing quizzes.
2. **Create**: Go to `/create` to build a new quiz. You can add as many questions as you like and choose between Boolean, Input, or Checkbox types.
3. **Delete**: Click the trash icon on any quiz in the dashboard. A custom confirmation modal will appear.
4. **Details**: Click on a quiz card to see its full question structure.

## 🛡 Code Quality

Both projects include ESLint for code quality. You can run linting via:
```bash
# Frontend
cd frontend && npm run lint

# Backend
cd backend && npm run lint
```

## 🚀 Deployment

### Frontend (Vercel)

The frontend is deployed on Vercel. To deploy your own instance:

1. Fork this repository
2. Import the project to Vercel
3. Set the root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
5. Deploy

### Backend (Railway/Render)

The backend can be deployed on Railway or Render:

#### Railway:
1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set the root directory to `backend`
4. Railway will auto-detect the NestJS app
5. Add environment variable `DATABASE_URL` (optional, uses SQLite by default)
6. Deploy

#### Render:
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
4. Deploy

### Environment Variables

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Backend**:
```
DATABASE_URL=file:./dev.db
PORT=3001
```
