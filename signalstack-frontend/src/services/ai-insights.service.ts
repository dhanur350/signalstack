import apiClient from './api-client';
import { ApiResponse } from '@/types/api.d';

export interface AiInsightRequest {
  question: string;
}

export interface AiInsightResponse {
  insight: string;
  // Potentially more structured data depending on the insight type
}

export const AiInsightsService = {
  async getInsight(data: AiInsightRequest): Promise<ApiResponse<AiInsightResponse>> {
    const response = await apiClient.post<ApiResponse<AiInsightResponse>>('/ai-insights', data);
    return response.data;
  },
};
