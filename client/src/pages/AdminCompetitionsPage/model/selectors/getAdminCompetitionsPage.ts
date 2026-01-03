import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminCompetitionsPageClosedCompetitions = (state: StateSchema) => state.adminCompetitionsPage?.closedCompetitions;
export const getAdminCompetitionsPageOpenedCompetitions = (state: StateSchema) => state.adminCompetitionsPage?.openedCompetitions;
export const getAdminCompetitionsPageAddingCompetitionName = (state: StateSchema) => state.adminCompetitionsPage?.addingCompetitionName;
export const getAdminCompetitionsPageAddingCompetitionDescription = (state: StateSchema) => state.adminCompetitionsPage?.addingCompetitionDescription;
export const getAdminCompetitionsPageAddingCompetitionDocuments = (state: StateSchema) => state.adminCompetitionsPage?.addingCompetitionDocuments || [];
export const getAdminCompetitionsPageIsLoading = (state: StateSchema) => state.adminCompetitionsPage?.isLoading;
export const getAdminCompetitionsPageError = (state: StateSchema) => state.adminCompetitionsPage?.error;
export const getAdminCompetitionsPageInited = (state: StateSchema) => state.adminCompetitionsPage?._inited;
