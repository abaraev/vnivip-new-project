import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminMemberDetailsPageMember = (state: StateSchema) => state.adminMemberDetailsPage?.member;
export const getAdminMemberDetailsPageIsLoading = (state: StateSchema) => state.adminMemberDetailsPage?.isLoading;
export const getAdminMemberDetailsPageError = (state: StateSchema) => state.adminMemberDetailsPage?.error;
export const getAdminMemberDetailsPageInited = (state: StateSchema) => state.adminMemberDetailsPage?._inited;
