import axios from 'axios';

const CHATGPT_API_KEY = import.meta.env.VITE_CHATGPT_API_KEY;

interface ChatGPTMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface ChatGPTRequest {
    model: string;
    messages: ChatGPTMessage[];
    max_tokens: number;
    temperature?: number;
}

interface ChatGPTChoice {
    message: ChatGPTMessage;
    finish_reason: string;
    index: number;
}

interface ChatGPTResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export const fetchChatGPTAnswer = async (
    question: string,
    model: string = 'gpt-3.5-turbo-0125'
): Promise<string> => {
    if (!CHATGPT_API_KEY) {
        throw new Error('ChatGPT API key is not configured');
    }

    try {
        const response = await axios.post<ChatGPTResponse>(
            'https://api.openai.com/v1/chat/completions',
            {
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant providing detailed answers about programming and technical topics.'
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000,
            },
            {
                headers: {
                    'Authorization': `Bearer ${CHATGPT_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.data.choices?.[0]?.message?.content) {
            throw new Error('Invalid response format from ChatGPT');
        }

        return response.data.choices[0].message.content;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error('Invalid ChatGPT API key');
            }
            if (error.response?.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            throw new Error(`ChatGPT API error: ${error.response?.data?.error?.message || error.message}`);
        }
        throw error;
    }
};
