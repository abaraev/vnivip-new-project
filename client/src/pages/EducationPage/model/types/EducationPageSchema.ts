import { Document } from 'entities/Document';

export interface EducationPageSchema {
    isLoading: boolean;
    error?: string;
    documents: Document[];
    _inited: boolean;
}
