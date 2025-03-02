import { AIResponse } from './types';
import axios from 'axios';
import type { MistralResponse } from './types';
import { handleAPIError } from './utils';

const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const API_URL = 'https://api.mistral.ai/v1/chat/completions';

export async function generateMistralResponse(prompt: string): Promise<MistralResponse> {
  if (!MISTRAL_API_KEY) {
    throw new Error('Mistral API key not configured');
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'mistral-small',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from Mistral API');
    }

    return {
      id: response.data.id,
      content: response.data.choices[0].message.content,
      model: 'mistral-small',
      choices: response.data.choices,
      usage: response.data.usage
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Mistral API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw handleAPIError(error, 'Mistral');
  }
}