import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminData = (state: StateSchema) => state.admin?.data;
export const getAdminIsInit = (state: StateSchema) => state.admin?.isInit;
