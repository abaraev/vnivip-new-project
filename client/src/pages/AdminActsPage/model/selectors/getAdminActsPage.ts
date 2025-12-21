import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminActsPageIsLoading = (state: StateSchema) => state.adminActsPage?.isLoading;
export const getAdminActsPageError = (state: StateSchema) => state.adminActsPage?.error;
export const getAdminActsPageInited = (state: StateSchema) => state.adminActsPage?._inited;
