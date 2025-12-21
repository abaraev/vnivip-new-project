import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminOrdersPageOrders = (state: StateSchema) => state.adminOrdersPage?.orders;
export const getAdminOrdersPageIsLoading = (state: StateSchema) => state.adminOrdersPage?.isLoading;
export const getAdminOrdersPageError = (state: StateSchema) => state.adminOrdersPage?.error;
export const getAdminOrdersPageInited = (state: StateSchema) => state.adminOrdersPage?._inited;
