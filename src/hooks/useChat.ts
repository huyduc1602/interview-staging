import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCachedAnswer } from '@/store/interview/slice';
import { chatWithGPT } from '@/api/chat';

interface UseChatProps {
  type?: 'questions' | 'knowledge';
}

export function useChat({ type = 'questions' }: UseChatProps = {}) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');

  const generateAnswer = async (content: string, promptKey: string) => {
    setLoading(true);
    setAnswer("");

    const contentId = content.toLowerCase().trim();
    
    try {
      const prompt = t(promptKey, { 
        [type === 'questions' ? 'question' : 'topic']: content 
      });
      
      const response = await chatWithGPT(prompt, {
        language: i18n.language,
        modelType: selectedModel
      });
      
      dispatch(setCachedAnswer({
        language: i18n.language,
        questionId: contentId,
        answer: response,
        type
      }));
      
      setAnswer(response);
    } catch (error) {
      console.error('Failed to generate answer:', error);
      if (error.message === 'API_RATE_LIMIT') {
        setAnswer(t(`${type}.messages.rateLimitError`));
      } else {
        setAnswer(t(`${type}.messages.error`));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    answer,
    selectedModel,
    setSelectedModel,
    generateAnswer,
    setAnswer
  };
}