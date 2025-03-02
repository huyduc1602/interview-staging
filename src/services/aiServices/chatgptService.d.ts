export interface ChatGPTMessage {
    role: string;
    content: string;
}

export interface ChatGPTRequest {
    model: string;
    messages: ChatGPTMessage[];
    max_tokens: number;
}

export interface ChatGPTResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

export interface ChatGPTResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

export interface ChatGPTRequest {
    model: string;
    messages: { role: string; content: string; }[];
    max_tokens: number;
}