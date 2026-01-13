import Link from 'next/link';
import { LayoutDashboard, PlusCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Questify</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            href="/quizzes"
            className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Quizzes</span>
          </Link>
          <Link
            href="/create"
            className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Quiz</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
