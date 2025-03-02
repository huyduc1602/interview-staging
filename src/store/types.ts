import type { KnowledgeCategory } from '@/types/knowledge';

export interface InterviewState {
    questions: KnowledgeCategory[];
    loading: boolean;
    error: string | null;
}

export interface RootState {
    interview: InterviewState;
}