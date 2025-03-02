export interface InterviewQuestion {
    question: string;
    answer?: string | null;
    category?: string;
    orderNumber?: number;
}

export interface Category {
    category: string;
    items: InterviewQuestion[];
}

export interface ExpandedCategories {
    [key: number]: boolean;
}