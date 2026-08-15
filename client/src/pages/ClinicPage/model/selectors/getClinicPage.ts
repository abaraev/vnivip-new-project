import { StateSchema } from 'app/providers/StoreProvider';

export const getClinicPageDocuments = (state: StateSchema) => state.сlinicPage?.documents;
export const getClinicPageIsLoading = (state: StateSchema) => state.сlinicPage?.isLoading;
export const getClinicPageError = (state: StateSchema) => state.сlinicPage?.error;
export const getClinicPageInited = (state: StateSchema) => state.сlinicPage?._inited;
