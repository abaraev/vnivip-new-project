import { Competition } from 'entities/Competition';
import { Document } from 'entities/Document';

export interface AdminCompetitionsPageSchema {
    isLoading: boolean;
    error?: string;
    closedCompetitions: Competition[];
    openedCompetitions: Competition[];
    _inited: boolean;
    addingCompetitionName: string;
    addingCompetitionDescription: string;
    addingCompetitionDocuments: Document[];
}
