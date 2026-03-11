import { Document } from 'entities/Document';
import { EntityState } from '@reduxjs/toolkit';

export interface AdminEducationPageSchema extends EntityState<Document> {
    isLoading: boolean;
    error?: string;
    _inited: boolean;
}
