import { StateSchema } from 'app/providers/StoreProvider';

export const getAboutInstitutePageContentCards = (state: StateSchema) => state.aboutInstitutePage?.contentCards;
export const getAboutInstitutePageIsLoading = (state: StateSchema) => state.aboutInstitutePage?.isLoading;
export const getAboutInstitutePageError = (state: StateSchema) => state.aboutInstitutePage?.error;
