import { useState } from 'react';
import { fetchChatGPTAnswer } from '@/services/aiServices/chatgptService';
import { generateGeminiResponse } from '@/services/aiServices/geminiService';
import { generateMistralResponse } from '@/services/aiServices/mistralService';
import { generateOpenChatResponse } from '@/services/aiServices/openchatService';
import { 
  type AIModel,
  type AIResponse,
  type TokenUsage,
  isOpenAIResponse,
  isGeminiResponse,
  isMistralResponse,
  isOpenChatResponse
} from '@/services/aiServices/types';

export function useChat({ type }: { type: 'chat' | 'knowledge' | 'questions' }) {
  const [selectedModel, setSelectedModel] = useState<AIModel>('gpt-3.5-turbo-0125');
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState<TokenUsage | null>(null);

  const generateAnswer = async (input: string): Promise<string> => {
    try {
      setLoading(true);
      let response: AIResponse;

      switch (selectedModel) {
        case 'gpt-3.5-turbo-0125':
        case 'gpt-4-turbo-preview':
          response = await fetchChatGPTAnswer(input, selectedModel);
          if (isOpenAIResponse(response)) {
            setUsage(response.usage);
            return response.choices[0].message.content;
          }
          break;

        case 'gemini-pro':
          response = await generateGeminiResponse(input);
          if (isGeminiResponse(response)) {
            setUsage(null); // Gemini doesn't provide standard token usage
            return response.candidates[0].content.parts[0].text;
          }
          break;

        case 'mistral-small':
          response = await generateMistralResponse(input);
          if (isMistralResponse(response)) {
            setUsage(response.usage);
            return response.choices[0].message.content;
          }
          break;

        case 'openchat-3.5':
          response = await generateOpenChatResponse(input);
          if (isOpenChatResponse(response)) {
            setUsage(response.usage);
            return response.choices[0].message.content;
          }
          break;

        default:
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
  };
}