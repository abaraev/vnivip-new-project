import { EntityState } from '@reduxjs/toolkit';
import { ContentCard, ContentCardAlignText, ContentCardFirstElement } from 'entities/ContentCard';

export interface AdminEngineeringPageSchema extends EntityState<ContentCard> {
    isLoading: boolean;
    error?: string;
    addingContentCardData: {
        video?: string,
        videoPoster?: string,
        img?: string,
        text: string,
        firstElement: ContentCardFirstElement,
        alignText: ContentCardAlignText,
    };
    _inited: boolean;
    _isEditing: boolean;
}
