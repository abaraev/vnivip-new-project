import { StateSchema } from 'app/providers/StoreProvider';

export const getEducationPageDocuments = (state: StateSchema) => state.educationPage?.documents;
export const getEducationPageIsLoading = (state: StateSchema) => state.educationPage?.isLoading;
export const getEducationPageError = (state: StateSchema) => state.educationPage?.error;
export const getEducationPageInited = (state: StateSchema) => state.educationPage?._inited;
