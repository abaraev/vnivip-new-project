import { News } from 'entities/News';

export interface NewsDetailsPageSchema {
    isLoading: boolean;
    error: string | undefined;
    _inited: boolean;
    news?: News;
}
