import { StateSchema } from 'app/providers/StoreProvider';

export const getAdministrationPageMembers = (state: StateSchema) => state.administrationPage?.members;
export const getAdministrationPageIsLoading = (state: StateSchema) => state.administrationPage?.isLoading;
export const getAdministrationPageError = (state: StateSchema) => state.administrationPage?.error;
export const getAdministrationPageInited = (state: StateSchema) => state.administrationPage?._inited;
