'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, CheckCircle2, Circle, Type, CheckSquare } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: string;
  text: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  options?: string[];
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export default function QuizDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`http://localhost:3001/quizzes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setQuiz(data);
      } else {
        router.push('/quizzes');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!quiz) return null;

  return (
    <div className="mx-auto max-w-3xl py-10">
      <Link
        href="/quizzes"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Quizzes
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">{quiz.title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-lg">
          Viewing quiz structure ({quiz.questions.length} questions).
        </p>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <div
            key={question.id}
            className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
                  {index + 1}
                </span>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 uppercase tracking-wider">
                  {question.type}
                </span>
              </div>
            </div>

            <h3 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-50">{question.text}</h3>

            <div className="space-y-3">
              {question.type === 'BOOLEAN' && (
                <div className="grid grid-cols-2 gap-3">
                  {['True', 'False'].map((option) => (
                    <div
                      key={option}
                      className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                      <Circle className="h-4 w-4" />
                      <span className="font-medium">{option}</span>
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'INPUT' && (
                <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 p-4 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <Type className="h-4 w-4" />
                    <span className="text-sm">User will provide a short text answer...</span>
                  </div>
                </div>
              )}

              {question.type === 'CHECKBOX' && (
                <div className="grid gap-2">
                  {question.options?.map((option, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                      <CheckSquare className="h-4 w-4" />
                      <span className="font-medium">{option}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
