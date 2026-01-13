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

### Quick Start (Concurrent Mode)

The project is configured to run both the frontend and backend simultaneously from the root directory.

1. **Clone and Install**:
```bash
# In the root directory
npm run install:all
```

2. **Initialize Database**:
```bash
cd backend
npx prisma migrate dev --name init
cd ..
```

3. **Run Development Server**:
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
