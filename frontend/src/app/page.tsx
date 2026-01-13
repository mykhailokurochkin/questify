import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
        <Sparkles className="h-3.5 w-3.5 text-purple-500" />
        <span>Try the new Quiz Builder</span>
      </div>
      <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
        Build Amazing Quizzes <br />
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          in Minutes
        </span>
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        The ultimate platform for creating, managing, and sharing interactive quizzes.
        Start building your first quiz today and engage your audience.
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/create"
          className="group flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-3.5 text-base font-semibold text-zinc-50 transition-all hover:bg-zinc-800 hover:shadow-lg hover:shadow-indigo-500/20 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Get Started
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/quizzes"
          className="rounded-full border border-zinc-200 bg-white px-8 py-3.5 text-base font-semibold text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          View All Quizzes
        </Link>
      </div>
    </div>
  );
}
