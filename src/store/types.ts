import { KnowledgeCategory } from '@/types/knowledge';
import { InterviewCategory } from '@/types/interview';

export interface KnowledgeItem {
    id: string;
    question: string;
    answer: string;
}

export interface InterviewQuestion {
    id: string;
    question: string;
    answer: string;
}

export interface InterviewState {
    questions: (KnowledgeCategory | InterviewCategory)[];
    loading: boolean;
    error: string | null;
}

export interface RootState {
    interview: InterviewState;
}