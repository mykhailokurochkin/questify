# Quiz Builder

A full-stack application to create and view quizzes.

## Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS, React Hook Form, Zod.
- **Backend**: NestJS, TypeScript, Prisma, SQLite.

## Project Structure
- `frontend/`: Next.js web application.
- `backend/`: NestJS API application.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Setup database:
   ```bash
   cd backend
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the application

- **Both (Concurrent)**: `npm run dev` (from the root directory)
- **Backend**: `cd backend && npm run start:dev`
- **Frontend**: `cd frontend && npm run dev`

## Features
- Create quizzes with multiple question types (Boolean, Input, Checkbox).
- List all quizzes.
- View quiz details.
- Delete quizzes.
