import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminNewsPageListIsLoading = (state: StateSchema) => state.adminNewsPage?.listIsLoading ?? false;
export const getAdminNewsPagePage = (state: StateSchema) => state.adminNewsPage?.page ?? 1;
export const getAdminNewsPageHasMore = (state: StateSchema) => state.adminNewsPage?.hasMore;
export const getAdminNewsPageSearch = (state: StateSchema) => state.adminNewsPage?.search || '';
export const getAdminNewsPageLimit = (state: StateSchema) => state.adminNewsPage?.limit || 8;
export const getAdminNewsPageOrder = (state: StateSchema) => state.adminNewsPage?.order || 'DESC';
export const getAdminNewsPageInited = (state: StateSchema) => state.adminNewsPage?._inited;
