import { Competition } from 'entities/Competition';

export interface CompetitionsPageSchema {
    isLoading: boolean;
    error?: string;
    competitions: Competition[];
    _inited: boolean;
}
