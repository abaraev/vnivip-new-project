import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminCompetitionsPageCompetitions = (state: StateSchema) => state.adminCompetitionsPage?.competitions;
export const getAdminCompetitionsPageAddingCompetitionName = (state: StateSchema) => state.adminCompetitionsPage?.addingCompetitionName;
export const getAdminCompetitionsPageAddingCompetitionDescription = (state: StateSchema) => state.adminCompetitionsPage?.addingCompetitionDescription;
export const getAdminCompetitionsPageIsLoading = (state: StateSchema) => state.adminCompetitionsPage?.isLoading;
export const getAdminCompetitionsPageError = (state: StateSchema) => state.adminCompetitionsPage?.error;
export const getAdminCompetitionsPageInited = (state: StateSchema) => state.adminCompetitionsPage?._inited;
