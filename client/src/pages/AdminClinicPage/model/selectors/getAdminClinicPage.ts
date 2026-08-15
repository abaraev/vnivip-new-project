import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminClinicPageIsLoading = (state: StateSchema) => state.adminClinicPage?.isLoading;
export const getAdminClinicPageError = (state: StateSchema) => state.adminClinicPage?.error;
export const getAdminClinicPageInited = (state: StateSchema) => state.adminClinicPage?._inited;
