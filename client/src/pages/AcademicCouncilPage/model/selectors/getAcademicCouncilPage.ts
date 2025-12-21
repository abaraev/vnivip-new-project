import { StateSchema } from 'app/providers/StoreProvider';

export const getAcademicCouncilPageMembers = (state: StateSchema) => state.academicCouncilPage?.members;
export const getAcademicCouncilPageIsLoading = (state: StateSchema) => state.academicCouncilPage?.isLoading;
export const getAcademicCouncilPageError = (state: StateSchema) => state.academicCouncilPage?.error;
export const getAcademicCouncilPageInited = (state: StateSchema) => state.academicCouncilPage?._inited;
