import { Document } from 'entities/Document';
import { EntityState } from '@reduxjs/toolkit';

export interface AdminScienceLibraryPageSchema extends EntityState<Document> {
    isLoading: boolean;
    error?: string;
    _inited: boolean;
}
