'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import QuizForm from '@/components/QuizForm';

export default function EditQuizPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-4xl py-10">
      <Link
        href="/quizzes"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Quizzes
      </Link>

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Edit Quiz</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-lg">Modify your questions and configurations.</p>
      </div>

      <QuizForm mode="edit" quizId={id as string} />
    </div>
  );
}
