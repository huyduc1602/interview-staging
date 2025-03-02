import { BaseItem } from './common';

export interface InterviewQuestion extends BaseItem {
    question: string;
    answer?: string | null;
    orderNumber?: number;
}

export interface InterviewCategory {
    category: string;
    items: InterviewQuestion[];
}

export interface ExpandedCategories {
    [key: number]: boolean;
}