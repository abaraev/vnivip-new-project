import { StateSchema } from 'app/providers/StoreProvider';

export const getVacanciesPageVacancies = (state: StateSchema) => state.vacanciesPage?.vacancies;
export const getVacanciesPageIsLoading = (state: StateSchema) => state.vacanciesPage?.isLoading;
export const getVacanciesPageError = (state: StateSchema) => state.vacanciesPage?.error;
export const getVacanciesPageInited = (state: StateSchema) => state.vacanciesPage?._inited;
