import { KnowledgeItem, InterviewQuestion } from '@/types';

export interface InterviewState {
    questions: (KnowledgeItem | InterviewQuestion)[];
    loading: boolean;
    error: string | null;
}

export interface RootState {
    interview: InterviewState;
}