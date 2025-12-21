import { StateSchema } from 'app/providers/StoreProvider';
import { Service } from 'entities/Service';

export const getCartPageServices = (state: StateSchema) => state.cartPage?.services;
export const getCartPageIsLoading = (state: StateSchema) => state.cartPage?.isLoading;
export const getCartPageError = (state: StateSchema) => state.cartPage?.error;
export const getCartPageName = (state: StateSchema) => state.cartPage?.name || '';
export const getCartPageSecondName = (state: StateSchema) => state.cartPage?.secondName || '';
export const getCartPagePhone = (state: StateSchema) => state.cartPage?.phone || '';
export const getCartPageEmail = (state: StateSchema) => state.cartPage?.email || '';
export const getCartPageComment = (state: StateSchema) => state.cartPage?.comment || '';
export const getCartPageDocuments = (state: StateSchema) => state.cartPage?.documents || [];
export const getCartPageValidationErrors = (state: StateSchema) => state.cartPage?.validationErrors || [];
export const getCartPageOrderSent = (state: StateSchema) => state.cartPage?.orderSent;
export const getCartPageOrderNumber = (state: StateSchema) => state.cartPage?._orderNumber;
export const getCartPageInited = (state: StateSchema) => state.cartPage?._inited;
