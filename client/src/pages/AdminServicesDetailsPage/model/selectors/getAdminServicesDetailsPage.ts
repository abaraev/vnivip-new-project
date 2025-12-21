import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminServicesDetailsPageService = (state: StateSchema) => state.adminServicesDetailsPage?.service;
export const getAdminServicesDetailsPageName = (state: StateSchema) => state.adminServicesDetailsPage?.name;
export const getAdminServicesDetailsPagePrice = (state: StateSchema) => state.adminServicesDetailsPage?.price;
export const getAdminServicesDetailsPageCoverImg = (state: StateSchema) => state.adminServicesDetailsPage?.coverImg;
export const getAdminServicesDetailsPageIsLoading = (state: StateSchema) => state.adminServicesDetailsPage?.isLoading;
export const getAdminServicesDetailsPageError = (state: StateSchema) => state.adminServicesDetailsPage?.error;
export const getAdminServicesDetailsPageInited = (state: StateSchema) => state.adminServicesDetailsPage?._inited;
