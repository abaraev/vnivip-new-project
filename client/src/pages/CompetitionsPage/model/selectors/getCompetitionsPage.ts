import { StateSchema } from 'app/providers/StoreProvider';

export const getCompetitionsPageCompetitions = (state: StateSchema) => state.competitionsPage?.competitions;
export const getCompetitionsPageIsLoading = (state: StateSchema) => state.competitionsPage?.isLoading;
export const getCompetitionsPageError = (state: StateSchema) => state.competitionsPage?.error;
export const getCompetitionsPageInited = (state: StateSchema) => state.competitionsPage?._inited;
