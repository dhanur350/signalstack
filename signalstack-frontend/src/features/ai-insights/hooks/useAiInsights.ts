import { useMutation } from '@tanstack/react-query';
import { AiInsightsService, AiInsightRequest } from '@/services/ai-insights.service';

export const useAiInsight = () => {
  return useMutation({
    mutationFn: (data: AiInsightRequest) => AiInsightsService.getInsight(data),
  });
};
