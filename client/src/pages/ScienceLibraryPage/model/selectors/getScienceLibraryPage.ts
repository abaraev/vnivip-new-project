import { StateSchema } from 'app/providers/StoreProvider';

export const getScienceLibraryPageDocuments = (state: StateSchema) => state.scienceLibraryPage?.documents;
export const getScienceLibraryPageIsLoading = (state: StateSchema) => state.scienceLibraryPage?.isLoading;
export const getScienceLibraryPageError = (state: StateSchema) => state.scienceLibraryPage?.error;
export const getScienceLibraryPageInited = (state: StateSchema) => state.scienceLibraryPage?._inited;
