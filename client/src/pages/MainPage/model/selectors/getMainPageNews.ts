import { StateSchema } from 'app/providers/StoreProvider';

export const getMainPageNews = (state: StateSchema) => state.mainPageNews?.news;
export const getMainPageMainNews = (state: StateSchema) => state.mainPageNews?.mainNews;
export const getMainPageNewsInited = (state: StateSchema) => state.mainPageNews?._inited;
