import { ContentCard } from 'entities/ContentCard';

export interface AboutInstitutePageSchema {
    isLoading: boolean;
    error?: string;
    contentCards: ContentCard[]
}
