import { useState } from 'react';
import { fetchChatGPTAnswer } from '@/services/chatgptService';

interface UseChatProps {
  type: 'chat' | 'knowledge' | 'questions';
}

export function useChat({ type }: UseChatProps) {
  // Set default model to GPT-3.5-turbo
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo-0125');
  const [loading, setLoading] = useState(false);

  const generateAnswer = async (input: string): Promise<string> => {
    try {
      setLoading(true);
      const response = await fetchChatGPTAnswer(input, selectedModel);
      
      if (!response) {
        throw new Error('No response from ChatGPT');
      }

      return response;
    } catch (error) {
      console.error('ChatGPT Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    selectedModel,
    setSelectedModel,
    generateAnswer,
  };
}