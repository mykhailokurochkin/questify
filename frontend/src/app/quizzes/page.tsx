'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, ChevronRight, ArrowRight, Loader2, Info } from 'lucide-react';

interface QuizItem {
  id: string;
  title: string;
  _count: {
    questions: number;
  };
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://localhost:3001/quizzes');
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this quiz?')) return;

    try {
      const response = await fetch(`http://localhost:3001/quizzes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQuizzes((prev) => prev.filter((q) => q.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Quizzes</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-lg">Manage and view your existing quizzes.</p>
        </div>
        <Link
          href="/create"
          className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-bold text-zinc-50 transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          New Quiz
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 py-20 text-center dark:border-zinc-800">
          <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-900">
            <Info className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">No quizzes found</h3>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">Get started by creating your first quiz.</p>
          <Link
            href="/create"
            className="mt-6 flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Create first quiz <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/quizzes/${quiz.id}`}
              className="group flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-400/50"
            >
              <div className="flex items-center gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400">
                  <span className="text-lg font-bold">{quiz.title.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {quiz._count.questions} {quiz._count.questions === 1 ? 'question' : 'questions'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => deleteQuiz(quiz.id, e)}
                  className="rounded-full p-2.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <ChevronRight className="h-5 w-5 text-zinc-300 transition-transform group-hover:translate-x-1 dark:text-zinc-700" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
