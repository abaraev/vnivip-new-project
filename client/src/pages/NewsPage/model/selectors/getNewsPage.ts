import { StateSchema } from 'app/providers/StoreProvider';

export const getNewsPageMainNews = (state: StateSchema) => state.newsPage?.mainNews || undefined;
export const getNewsPageListIsLoading = (state: StateSchema) => state.newsPage?.listIsLoading ?? false;
export const getNewsPageMainNewsIsLoading = (state: StateSchema) => state.newsPage?.mainNewsIsLoading ?? false;
export const getNewsPagePage = (state: StateSchema) => state.newsPage?.page ?? 1;
export const getNewsPageHasMore = (state: StateSchema) => state.newsPage?.hasMore;
export const getNewsPageSearch = (state: StateSchema) => state.newsPage?.search || '';
export const getNewsPageLimit = (state: StateSchema) => state.newsPage?.limit || 8;
export const getNewsPageOrder = (state: StateSchema) => state.newsPage?.order || 'DESC';
export const getNewsPageInited = (state: StateSchema) => state.newsPage?._inited;
