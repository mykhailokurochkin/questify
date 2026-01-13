import QuizForm from '@/components/QuizForm';

export default function CreateQuizPage() {
  return (
    <div className="mx-auto max-w-4xl py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Create Quiz</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-lg">Add questions and configure answer types.</p>
      </div>

      <QuizForm mode="create" />
    </div>
  );
}
