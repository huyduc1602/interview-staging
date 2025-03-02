import { useState, useEffect, useCallback } from 'react';
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
  const [selectedModel, setSelectedModel] = useState<AIModelType>(AIModel.GPT35_0125);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState<TokenUsage | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);

  const getSystemContext = useCallback(() => {
    switch (options.type) {
      case 'chat':
        return 'You are a helpful AI assistant.';
      case 'questions':
        return 'You are an interview preparation assistant.';
      case 'knowledge':
        return 'You are a knowledge base assistant.';
      default:
        return 'You are a helpful AI assistant.';
    }
  }, [options.type]);

  const generateAnswer = useCallback(async (input: string): Promise<string> => {
    try {
      setLoading(true);

      const finalInput = isFirstQuestion
        ? `${getSystemContext()}\n\n${input}`
        : input;

      let response: AIResponse;

      switch (selectedModel) {
        case AIModel.GPT35:
        case AIModel.GPT4:
        case AIModel.GPT35_0125:
          response = await fetchChatGPTAnswer(finalInput, selectedModel);
          if (isOpenAIResponse(response)) {
            setUsage(response.usage ?? null);
            setIsFirstQuestion(false);
            return response.choices[0].message.content;
          }
          break;

        case AIModel.GEMINI:
          response = await generateGeminiResponse(finalInput);
          if (isGeminiResponse(response)) {
            setUsage(null);
            setIsFirstQuestion(false);
            return response.candidates[0].content.parts[0].text;
          }
          break;

        case AIModel.MISTRAL:
          response = await generateMistralResponse(finalInput);
          if (isMistralResponse(response)) {
            setUsage(response.usage ?? null);
            setIsFirstQuestion(false);
            return response.choices[0].message.content;
          }
          break;

        case AIModel.OPENCHAT:
          response = await generateOpenChatResponse(finalInput);
          if (isOpenChatResponse(response)) {
            setUsage(response.usage ?? null);
            setIsFirstQuestion(false);
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
  }, [selectedModel, isFirstQuestion, getSystemContext]);

  useEffect(() => {
    setIsFirstQuestion(true);
  }, [selectedModel]);

  return {
    loading,
    selectedModel,
    setSelectedModel,
    generateAnswer,
    usage,
    answer,
    setAnswer,
    isFirstQuestion
  };
}