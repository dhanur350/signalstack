'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAiInsight } from '../hooks/useAiInsights';
import { useState } from 'react';

interface AiInsightFormData {
  question: string;
}

export default function AiInsightPanel() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AiInsightFormData>();
  const { mutate, isPending, data, error } = useAiInsight();
  const [insight, setInsight] = useState<string | null>(null);

  const onSubmit = (formData: AiInsightFormData) => {
    mutate(
      { question: formData.question },
      {
        onSuccess: (response) => {
          if (response.data) {
            setInsight(response.data.insight || 'No insight available');
          }
          reset();
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ask a Question</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Question
            </label>
            <textarea
              id="question"
              {...register('question', { required: 'Question is required' })}
              placeholder="e.g., Which department has the highest average salary?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Processing...' : 'Get Insight'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            Error: {error instanceof Error ? error.message : 'Failed to get insight'}
          </div>
        )}
      </div>

      {insight && (
        <div className="bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">AI Insight</h3>
          <p className="text-indigo-800 dark:text-indigo-200">{insight}</p>
        </div>
      )}
    </div>
  );
}
