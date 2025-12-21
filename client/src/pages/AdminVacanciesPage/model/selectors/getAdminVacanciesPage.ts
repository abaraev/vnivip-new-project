import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminVacanciesPageVacancies = (state: StateSchema) => state.adminVacanciesPage?.vacancies;
export const getAdminVacanciesPageAddingVacancyJobName = (state: StateSchema) => state.adminVacanciesPage?.addingVacancyJobName;
export const getAdminVacanciesPageAddingVacancyDescription = (state: StateSchema) => state.adminVacanciesPage?.addingVacancyDescription;
export const getAdminVacanciesPageIsLoading = (state: StateSchema) => state.adminVacanciesPage?.isLoading;
export const getAdminVacanciesPageError = (state: StateSchema) => state.adminVacanciesPage?.error;
export const getAdminVacanciesPageInited = (state: StateSchema) => state.adminVacanciesPage?._inited;
