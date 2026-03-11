import { Document } from 'entities/Document';

export interface ScienceLibraryPageSchema {
    isLoading: boolean;
    error?: string;
    documents: Document[];
    _inited: boolean;
}
