import AiInsightPanel from '@/features/ai-insights/components/AiInsightPanel';

export default function AiInsightsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">AI Compensation Insights</h1>
      <AiInsightPanel />
    </div>
  );
}
