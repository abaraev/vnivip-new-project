import { StateSchema } from 'app/providers/StoreProvider';
import { News } from 'entities/News';

export const getNewsDetailsPageNews = (state: StateSchema) => state.newsDetailsPage?.news;
export const getNewsDetailsPageIsLoading = (state: StateSchema) => state.newsDetailsPage?.isLoading;
export const getNewsDetailsPageError = (state: StateSchema) => state.newsDetailsPage?.error;
export const getNewsDetailsPageInited = (state: StateSchema) => state.newsDetailsPage?._inited;
