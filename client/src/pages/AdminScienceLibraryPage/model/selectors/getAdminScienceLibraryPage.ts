import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminScienceLibraryPageIsLoading = (state: StateSchema) => state.adminScienceLibraryPage?.isLoading;
export const getAdminScienceLibraryPageError = (state: StateSchema) => state.adminScienceLibraryPage?.error;
export const getAdminScienceLibraryPageInited = (state: StateSchema) => state.adminScienceLibraryPage?._inited;
