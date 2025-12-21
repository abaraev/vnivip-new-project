import { StateSchema } from 'app/providers/StoreProvider';
import { News } from 'entities/News';

export const getAdminOrdersDetailsPageOrder = (state: StateSchema) => state.adminOrdersDetailsPage?.order;
export const getAdminOrdersDetailsPageOrderStatus = (state: StateSchema) => state.adminOrdersDetailsPage?.orderStatus;
export const getAdminOrdersDetailsPageIsChanged = (state: StateSchema) => state.adminOrdersDetailsPage?.isChanged;
export const getAdminOrdersDetailsPageIsLoading = (state: StateSchema) => state.adminOrdersDetailsPage?.isLoading;
export const getAdminOrdersDetailsPageError = (state: StateSchema) => state.adminOrdersDetailsPage?.error;
export const getAdminOrdersDetailsPageInited = (state: StateSchema) => state.adminOrdersDetailsPage?._inited;
