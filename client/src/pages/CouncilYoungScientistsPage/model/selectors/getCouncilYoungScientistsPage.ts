import { StateSchema } from 'app/providers/StoreProvider';

export const getCouncilYoungScientistsPageMembers = (state: StateSchema) => state.councilYoungScientistsPage?.members;
export const getCouncilYoungScientistsPageIsLoading = (state: StateSchema) => state.councilYoungScientistsPage?.isLoading;
export const getCouncilYoungScientistsPageError = (state: StateSchema) => state.councilYoungScientistsPage?.error;
export const getCouncilYoungScientistsPageInited = (state: StateSchema) => state.councilYoungScientistsPage?._inited;
