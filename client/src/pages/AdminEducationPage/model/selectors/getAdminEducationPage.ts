import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminEducationPageIsLoading = (state: StateSchema) => state.adminEducationPage?.isLoading;
export const getAdminEducationPageError = (state: StateSchema) => state.adminEducationPage?.error;
export const getAdminEducationPageInited = (state: StateSchema) => state.adminEducationPage?._inited;
