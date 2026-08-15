import { Document } from 'entities/Document';

export interface ClinicPageSchema {
    isLoading: boolean;
    error?: string;
    documents: Document[];
    _inited: boolean;
}
