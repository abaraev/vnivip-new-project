import { StateSchema } from 'app/providers/StoreProvider';

export const getCompetitionsPageClosedCompetitions = (state: StateSchema) => state.competitionsPage?.closedCompetitions;
export const getCompetitionsPageOpenedCompetitions = (state: StateSchema) => state.competitionsPage?.openedCompetitions;
export const getCompetitionsPageIsLoading = (state: StateSchema) => state.competitionsPage?.isLoading;
export const getCompetitionsPageError = (state: StateSchema) => state.competitionsPage?.error;
export const getCompetitionsPageInited = (state: StateSchema) => state.competitionsPage?._inited;
