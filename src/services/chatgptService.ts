import axios from "axios";

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
    choices: ChatGPTChoice[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export const fetchChatGPTAnswer = async (question: string): Promise<string> => {
    try {
        if (!CHATGPT_API_KEY) {
            throw new Error('ChatGPT API key is not configured');
        }

        const response = await axios.post<ChatGPTResponse>(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: `Giải thích chi tiết: ${question}` }],
                max_tokens: 500,
                temperature: 0.7
            } as ChatGPTRequest,
            {
                headers: {
                    'Authorization': `Bearer ${CHATGPT_API_KEY}`,
                    'Content-Type': 'application/json'
                },
            }
        );

        if (!response.data.choices?.[0]?.message?.content) {
            throw new Error('Invalid response from ChatGPT API');
        }

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching ChatGPT answer:', error);
        if (axios.isAxiosError(error)) {
            throw new Error(`ChatGPT API error: ${error.response?.data?.error?.message || error.message}`);
        }
        throw error;
    }
};
