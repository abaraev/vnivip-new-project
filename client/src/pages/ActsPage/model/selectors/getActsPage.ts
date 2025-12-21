import { StateSchema } from 'app/providers/StoreProvider';

export const getActsPageDocuments = (state: StateSchema) => state.actsPage?.documents;
export const getActsPageIsLoading = (state: StateSchema) => state.actsPage?.isLoading;
export const getActsPageError = (state: StateSchema) => state.actsPage?.error;
export const getActsPageInited = (state: StateSchema) => state.actsPage?._inited;
