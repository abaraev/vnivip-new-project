import { News } from 'entities/News';
import { EntityState } from '@reduxjs/toolkit';
import { Paragraph, ParagraphAlignText, ParagraphFirstElement } from 'entities/Paragraph';

export interface AdminNewsDetailsPageSchema extends EntityState<Paragraph> {
    isLoading: boolean;
    error?: string;
    news?: News;
    title?: string;
    description?: string;
    coverImg?: string;
    published?: boolean;
    addingParagraphData: {
        video?: string,
        videoPoster?: string,
        img?: string,
        text: string,
        firstElement: ParagraphFirstElement,
        alignText: ParagraphAlignText,
    };
    newsDay?: string,
    newsMonth?: string,
    newsYear?: string,
    _inited: boolean;
    _isEditing: boolean;
}
