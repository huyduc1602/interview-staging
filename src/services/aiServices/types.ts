export enum AIModel {
  GPT35 = 'gpt-3.5-turbo',
  GPT4 = 'gpt-4',
  GEMINI = 'gemini',
  MISTRAL = 'mistral',
  OPENCHAT = 'openchat'
}

export interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface BaseResponse {
  model: AIModel;
  usage?: TokenUsage;
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
}

export interface OpenChatResponse extends BaseResponse {
  id: string;
  object: string;
  created: number;
  content: string;
  prompt: string;
  choices: Array<{
    message: string;
    finish_reason: string;
  }>;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface SheetData {
  id: string;
  values: any[][];
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
    typeof response.choices[0].message === 'string';
}

export const processGeminiResponse = (response: any): GeminiResponse => {
  return {
    model: AIModel.GEMINI,
    candidates: response.candidates || [{
      content: {
        parts: [{ text: '' }],
        role: 'model'
      },
      finishReason: 'STOP'
    }]
  };
};