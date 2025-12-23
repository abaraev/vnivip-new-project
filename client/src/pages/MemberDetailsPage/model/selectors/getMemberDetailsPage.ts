import { StateSchema } from 'app/providers/StoreProvider';

export const getMemberDetailsPageMember = (state: StateSchema) => state.memberDetailsPage?.member;
export const getMemberDetailsPageIsLoading = (state: StateSchema) => state.memberDetailsPage?.isLoading;
export const getMemberDetailsPageError = (state: StateSchema) => state.memberDetailsPage?.error;
export const getMemberDetailsPageInited = (state: StateSchema) => state.memberDetailsPage?._inited;
