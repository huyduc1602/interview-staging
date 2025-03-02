import { useState } from 'react';
import { fetchChatGPTAnswer } from '@/services/aiServices/chatgptService';
import { generateGeminiResponse } from '@/services/aiServices/geminiService';
import { generateMistralResponse } from '@/services/aiServices/mistralService';
import { generateOpenChatResponse } from '@/services/aiServices/openchatService';
import {
  AIModel,
  type AIModelType,
  type AIResponse,
  type TokenUsage,
  isOpenAIResponse,
  isGeminiResponse,
  isMistralResponse,
  isOpenChatResponse
} from '@/services/aiServices/types';

interface ChatOptions {
  type: 'chat' | 'questions' | 'knowledge';
}

export function useChat(options: ChatOptions) {
  const [selectedModel, setSelectedModel] = useState<AIModelType>(AIModel.GPT35);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState<TokenUsage | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  const generateAnswer = async (input: string): Promise<string> => {
    try {
      setLoading(true);
      let response: AIResponse;

      switch (selectedModel) {
        case AIModel.GPT35:
        case AIModel.GPT4:
        case AIModel.GPT35_0125:
          response = await fetchChatGPTAnswer(input, selectedModel);
          if (isOpenAIResponse(response)) {
            setUsage(response.usage ?? null);
            return response.choices[0].message.content;
          }
          break;

        case AIModel.GEMINI:
          response = await generateGeminiResponse(input);
          if (isGeminiResponse(response)) {
            setUsage(null);
            return response.candidates[0].content.parts[0].text;
          }
          break;

        case AIModel.MISTRAL:
          response = await generateMistralResponse(input);
          if (isMistralResponse(response)) {
            setUsage(response.usage ?? null);
            return response.choices[0].message.content;
          }
          break;

        case AIModel.OPENCHAT:
          response = await generateOpenChatResponse(input);
          if (isOpenChatResponse(response)) {
            setUsage(response.usage ?? null);
            return response.choices[0].message.content;
          }
          break;

        default:
          console.error('Unsupported model:', selectedModel);
          throw new Error(`Model ${selectedModel} is not supported`);
      }

      throw new Error(`Invalid response format from ${selectedModel}`);
    } catch (error) {
      console.error('Error in generateAnswer:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : `Unknown error with ${selectedModel}`;
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    selectedModel,
    setSelectedModel,
    generateAnswer,
    usage,
    answer,
    setAnswer
  };
}