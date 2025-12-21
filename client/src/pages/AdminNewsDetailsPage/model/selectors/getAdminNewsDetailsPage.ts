import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminNewsDetailsPageNews = (state: StateSchema) => state.adminNewsDetailsPage?.news;
export const getAdminNewsDetailsPageTitle = (state: StateSchema) => state.adminNewsDetailsPage?.title;
export const getAdminNewsDetailsPageDescription = (state: StateSchema) => state.adminNewsDetailsPage?.description;
export const getAdminNewsDetailsPageCoverImg = (state: StateSchema) => state.adminNewsDetailsPage?.coverImg;
export const getAdminNewsDetailsPagePublished = (state: StateSchema) => state.adminNewsDetailsPage?.published;
export const getAdminNewsDetailsPageNewsDay = (state: StateSchema) => state.adminNewsDetailsPage?.newsDay;
export const getAdminNewsDetailsPageNewsMonth = (state: StateSchema) => state.adminNewsDetailsPage?.newsMonth;
export const getAdminNewsDetailsPageNewsYear = (state: StateSchema) => state.adminNewsDetailsPage?.newsYear;
export const getAdminNewsDetailsPageIsLoading = (state: StateSchema) => state.adminNewsDetailsPage?.isLoading;
export const getAdminNewsDetailsPageError = (state: StateSchema) => state.adminNewsDetailsPage?.error;
export const getAdminNewsDetailsPageAddingParagraphData = (state: StateSchema) => state.adminNewsDetailsPage?.addingParagraphData;
export const getAdminNewsDetailsPageInited = (state: StateSchema) => state.adminNewsDetailsPage?._inited;
export const getAdminNewsDetailsPageIsEditing = (state: StateSchema) => state.adminNewsDetailsPage?._isEditing;
