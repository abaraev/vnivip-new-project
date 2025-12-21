import { News } from 'entities/News';
import { EntityState } from '@reduxjs/toolkit';

export interface AdminNewsPageSchema extends EntityState<News> {
    mainNews?: News;
    listIsLoading: boolean;
    listError: string | undefined;
    mainNewsIsLoading: boolean;
    mainNewsError: string | undefined;
    page: number;
    hasMore: boolean;
    search: string;
    limit: number;
    order: 'ASC' | 'DESC';

    _inited: boolean;
}
