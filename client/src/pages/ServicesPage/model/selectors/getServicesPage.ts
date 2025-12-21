import { StateSchema } from 'app/providers/StoreProvider';

export const getServicesPageServices = (state: StateSchema) => state.servicesPage?.services;
export const getServicesPageIsLoading = (state: StateSchema) => state.servicesPage?.isLoading;
export const getServicesPageError = (state: StateSchema) => state.servicesPage?.error;
export const getServicesPageInited = (state: StateSchema) => state.servicesPage?._inited;
