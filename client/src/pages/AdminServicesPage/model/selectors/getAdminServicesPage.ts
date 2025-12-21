import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminServicesPageServices = (state: StateSchema) => state.adminServicesPage?.services;
export const getAdminServicesPageAddingServiceName = (state: StateSchema) => state.adminServicesPage?.addingServiceName;
export const getAdminServicesPageAddingServicePrice = (state: StateSchema) => state.adminServicesPage?.addingServicePrice;
export const getAdminServicesPageIsLoading = (state: StateSchema) => state.adminServicesPage?.isLoading;
export const getAdminServicesPageError = (state: StateSchema) => state.adminServicesPage?.error;
export const getAdminServicesPageInited = (state: StateSchema) => state.adminServicesPage?._inited;
