import { Competition } from 'entities/Competition';

export interface AdminCompetitionsPageSchema {
    isLoading: boolean;
    error?: string;
    competitions: Competition[];
    _inited: boolean;
    addingCompetitionName: string;
    addingCompetitionDescription: string;
}
