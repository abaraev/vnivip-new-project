import { Document } from 'entities/Document';

export interface ActsPageSchema {
    isLoading: boolean;
    error?: string;
    documents: Document[];
    _inited: boolean;
}
