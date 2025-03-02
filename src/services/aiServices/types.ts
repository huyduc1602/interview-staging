export type AIModel = 
  | 'gpt-3.5-turbo-0125'
  | 'gpt-4-turbo-preview'
  | 'gemini-pro'
  | 'mistral-small'
  | 'openchat-3.5';

export interface BaseResponse {
  content: string;
  model: AIModel;
}

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface OpenAIResponse extends BaseResponse {
  id: string;
  object: string;
  created: number;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      refusal: null | string;
    };
    logprobs: null;
    finish_reason: string;
  }>;
  usage: TokenUsage;
}

export interface GeminiResponse extends BaseResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
    avgLogprobs?: number;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: Array<{
      modality: string;
      tokenCount: number;
    }>;
    candidatesTokensDetails: Array<{
      modality: string;
      tokenCount: number;
    }>;
  };
  modelVersion?: string;
}

export interface MistralResponse extends BaseResponse {
  id: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      tool_calls: null | any;
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

export interface OpenChatResponse extends BaseResponse {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string; // Changed from AIModel to string to support full model name
  prompt: any[];
  choices: Array<{
    finish_reason: 'stop' | 'length' | 'content_filter';
    seed: number;
    logprobs: null;
    index: number;
    message: {
      role: 'assistant' | 'user';
      content: string;
      tool_calls: any[];
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export type AIResponse = 
  | OpenAIResponse 
  | GeminiResponse 
  | MistralResponse 
  | OpenChatResponse;

export function isOpenAIResponse(response: AIResponse): response is OpenAIResponse {
  return 'object' in response && response.object === 'chat.completion';
}

export function isGeminiResponse(response: AIResponse): response is GeminiResponse {
  return 'candidates' in response;
}

export function isMistralResponse(response: AIResponse): response is MistralResponse {
  return 'choices' in response && 'message' in response.choices[0];
}

export function isOpenChatResponse(response: AIResponse): response is OpenChatResponse {
  return 'object' in response && 
         response.object === 'chat.completion' &&
         'choices' in response && 
         Array.isArray(response.choices) &&
         response.choices.length > 0 &&
         'message' in response.choices[0] &&
         'content' in response.choices[0].message &&
         'tool_calls' in response.choices[0].message;
}