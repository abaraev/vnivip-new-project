import { StateSchema } from 'app/providers/StoreProvider';

export const getEngineeringPageContentCards = (state: StateSchema) => state.engineeringPage?.contentCards;
export const getEngineeringPageIsLoading = (state: StateSchema) => state.engineeringPage?.isLoading;
export const getEngineeringPageError = (state: StateSchema) => state.engineeringPage?.error;
