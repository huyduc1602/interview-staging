export interface BaseItem {
    id?: string;
    category?: string;
    model?: string;
    type?: 'knowledge' | 'interview';
    timestamp?: number;
}

export type SavedItem = {
    followUpQuestions?: Array<{
        question: string;
        answer: string;
        timestamp: number;
    }>
} & BaseItem