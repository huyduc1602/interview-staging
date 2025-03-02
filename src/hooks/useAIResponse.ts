import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UseAIResponseProps {
  onSuccess?: (content: string) => void;
  onError?: (error: string) => void;
  generateAnswer: (input: string) => Promise<string>;
}

export function useAIResponse({ onSuccess, onError, generateAnswer }: UseAIResponseProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAnswer = async (input: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await generateAnswer(input);
      
      if (!response) {
        throw new Error(t('chat.errors.noResponse'));
      }

      onSuccess?.(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('chat.errors.unknown');
      setError(errorMessage);
      onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    setError,
    handleGenerateAnswer
  };
}