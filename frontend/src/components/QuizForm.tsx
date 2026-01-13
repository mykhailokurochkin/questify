'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Trash2, Circle, Type, CheckSquare, Save, PlusCircle, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const questionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
  options: z.array(z.string()).optional(),
});

const quizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

export type QuizFormValues = z.infer<typeof quizSchema>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface QuizFormProps {
  mode: 'create' | 'edit';
  quizId?: string;
  initialData?: QuizFormValues;
  onLoadingChange?: (loading: boolean) => void;
}

export default function QuizForm({ mode, quizId, initialData, onLoadingChange }: QuizFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData || {
      title: '',
      questions: [{ text: '', type: 'INPUT' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const fetchQuiz = useCallback(async () => {
    if (mode === 'create' || !quizId) return;

    try {
      const response = await fetch(`${API_URL}/quizzes/${quizId}`);
      if (response.ok) {
        const data = await response.json();
        reset({
          title: data.title,
          questions: data.questions.map((q: { text: string; type: string; options: string | null }) => ({
            text: q.text,
            type: q.type as 'BOOLEAN' | 'INPUT' | 'CHECKBOX',
            options: q.options ? JSON.parse(q.options as string) : undefined,
          })),
        });
      } else {
        toast.error('Failed to fetch quiz');
        router.push('/quizzes');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching quiz');
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  }, [mode, quizId, reset, router, onLoadingChange]);

  useEffect(() => {
    if (mode === 'edit') {
      fetchQuiz();
    }
  }, [mode, fetchQuiz]);

  const onSubmit = async (data: QuizFormValues) => {
    setIsSubmitting(true);
    try {
      const url = mode === 'create'
        ? `${API_URL}/quizzes`
        : `${API_URL}/quizzes/${quizId}`;

      const method = mode === 'create' ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(mode === 'create' ? 'Quiz created successfully!' : 'Quiz updated successfully!');
        router.push('/quizzes');
      } else {
        toast.error(mode === 'create' ? 'Failed to create quiz' : 'Failed to update quiz');
      }
    } catch (error) {
      console.error(error);
      toast.error('Could not connect to the server');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        <label htmlFor="title" className="mb-3 block text-base font-bold text-zinc-900 dark:text-zinc-50">
          Quiz Title
        </label>
        <input
          {...register('title')}
          type="text"
          placeholder="Enter your quiz title..."
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-3.5 text-lg outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-indigo-400"
        />
        {errors.title && <p className="mt-2 text-sm font-medium text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
          Questions
          <span className="text-sm font-normal bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-500">
            {fields.length}
          </span>
        </h2>

        <div className="grid gap-8">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="group relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
            >
              <div className="absolute -left-3 top-8 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-zinc-50 shadow-lg dark:bg-zinc-50 dark:text-zinc-900">
                {index + 1}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute right-4 top-4 rounded-full p-2.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
              >
                <Trash2 className="h-5 w-5" />
              </button>

              <div className="space-y-8">
                <div>
                  <label className="mb-3 block text-sm font-bold text-zinc-900 dark:text-zinc-50">Question Text</label>
                  <input
                    {...register(`questions.${index}.text`)}
                    placeholder="Your question..."
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-indigo-400"
                  />
                  {errors.questions?.[index]?.text && (
                    <p className="mt-2 text-sm font-medium text-red-500">{errors.questions[index]?.text?.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-4 block text-sm font-bold text-zinc-900 dark:text-zinc-50">Answer Type</label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      { id: 'BOOLEAN', label: 'True / False', icon: Circle },
                      { id: 'INPUT', label: 'Short Text', icon: Type },
                      { id: 'CHECKBOX', label: 'Checkbox', icon: CheckSquare },
                    ].map((type) => (
                      <label
                        key={type.id}
                        className={`flex cursor-pointer items-center justify-center gap-3 rounded-2xl border p-4 transition-all ${watch(`questions.${index}.type`) === type.id
                          ? 'border-indigo-500 bg-indigo-50/50 text-indigo-600 dark:border-indigo-400 dark:bg-indigo-950/20 dark:text-indigo-400'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700'
                          }`}
                      >
                        <input
                          {...register(`questions.${index}.type`)}
                          type="radio"
                          value={type.id}
                          className="sr-only"
                          onChange={() => {
                            setValue(`questions.${index}.type`, type.id as 'BOOLEAN' | 'INPUT' | 'CHECKBOX');
                            if (type.id === 'CHECKBOX' && !watch(`questions.${index}.options`)) {
                              setValue(`questions.${index}.options`, ['', '']);
                            }
                          }}
                        />
                        <type.icon className="h-5 w-5" />
                        <span className="font-semibold">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {watch(`questions.${index}.type`) === 'CHECKBOX' && (
                  <div className="space-y-4 rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-900/80">
                    <label className="block text-sm font-bold text-zinc-900 dark:text-zinc-50">Options</label>
                    <div className="space-y-3">
                      {(watch(`questions.${index}.options`) || []).map((_, optIndex) => (
                        <div key={optIndex} className="flex gap-2">
                          <input
                            {...register(`questions.${index}.options.${optIndex}`)}
                            placeholder={`Option ${optIndex + 1}`}
                            className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2 outline-none focus:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-800"
                          />
                          {(watch(`questions.${index}.options`)?.length ?? 0) > 2 && (
                            <button
                              type="button"
                              onClick={() => {
                                const options = [...(watch(`questions.${index}.options`) || [])];
                                options.splice(optIndex, 1);
                                setValue(`questions.${index}.options`, options);
                              }}
                              className="p-2 text-zinc-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const options = [...(watch(`questions.${index}.options`) || []), ''];
                          setValue(`questions.${index}.options`, options);
                        }}
                        className="flex items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400"
                      >
                        <PlusCircle className="h-4 w-4" />
                        Add Option
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ text: '', type: 'INPUT' })}
          className="flex w-full items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-zinc-200 py-8 text-base font-bold text-zinc-500 transition-all hover:border-indigo-500 hover:bg-indigo-50/30 hover:text-indigo-600 dark:border-zinc-800 dark:hover:border-indigo-400 dark:hover:bg-indigo-950/10 dark:hover:text-indigo-400"
        >
          <Plus className="h-6 w-6" />
          Add New Question
        </button>
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex items-center gap-3 rounded-full bg-zinc-900 px-16 py-5 text-lg font-bold text-zinc-50 shadow-2xl transition-all hover:bg-zinc-800 hover:scale-105 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isSubmitting ? (
            mode === 'create' ? 'Saving...' : 'Saving Changes...'
          ) : (
            <>
              <Save className="h-6 w-6" />
              {mode === 'create' ? 'Create Quiz' : 'Update Quiz'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
