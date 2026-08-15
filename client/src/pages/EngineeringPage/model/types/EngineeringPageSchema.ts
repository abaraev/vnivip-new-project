import { ContentCard } from 'entities/ContentCard';

export interface EngineeringPageSchema {
    isLoading: boolean;
    error?: string;
    contentCards: ContentCard[]
}
