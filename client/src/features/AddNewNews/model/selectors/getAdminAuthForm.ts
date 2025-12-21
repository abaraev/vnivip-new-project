import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminAuthFormPassword = (state: StateSchema) => state.adminAuthForm?.password;
export const getAdminAuthFormIsLoading = (state: StateSchema) => state.adminAuthForm?.isLoading;
export const getAdminAuthFormError = (state: StateSchema) => state.adminAuthForm?.error;
export const getAdminAuthFormLogin = (state: StateSchema) => state.adminAuthForm?.login;
