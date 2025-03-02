import { AxiosError } from 'axios';

export function handleAPIError(error: unknown, provider: string): never {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      throw new Error(`Invalid ${provider} API key`);
    }
    if (error.response?.status === 429) {
      throw new Error(`${provider} rate limit exceeded`);
    }
    throw new Error(`${provider} API Error: ${error.response?.data?.error?.message || error.message}`);
  }
  throw error;
}