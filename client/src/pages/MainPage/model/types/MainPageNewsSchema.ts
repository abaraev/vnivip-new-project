import { News } from 'entities/News';

export interface MainPageNewsSchema {
    news?: News[];
    mainNews?: News;
    isLoading: boolean;
    error: string | undefined;

    _inited: boolean;
}
