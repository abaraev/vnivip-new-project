import { Competition } from 'entities/Competition';

export interface CompetitionsPageSchema {
    isLoading: boolean;
    error?: string;
    openedCompetitions: Competition[];
    closedCompetitions: Competition[];
    _inited: boolean;
}
