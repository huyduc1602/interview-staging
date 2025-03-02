export interface KnowledgeItem {
    id?: string;
    content: string;
    answer: string | null;
    category?: string;
    type?: 'knowledge';
}

export interface SavedItem {
    id: string;
    type: 'knowledge';
    category?: string;
    question: string;
    answer: string;
    model: string;
    timestamp?: number;
}

export interface KnowledgeCategory {
    category: string;
    items: KnowledgeItem[];
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: number;
    isError?: boolean;
}

export interface ChatHistory {
    [key: string]: ChatMessage[];
}

export interface ExpandedCategories {
    [key: number]: boolean;
}