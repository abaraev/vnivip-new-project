import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminRecentEventsPageIsLoading = (state: StateSchema) => state.adminRecentEventsPage?.isLoading;
export const getAdminRecentEventsPageError = (state: StateSchema) => state.adminRecentEventsPage?.error;
export const getAdminRecentEventsPageAddingContentCardData = (state: StateSchema) => state.adminRecentEventsPage?.addingContentCardData;
export const getAdminRecentEventsPageInited = (state: StateSchema) => state.adminRecentEventsPage?._inited;
export const getAdminRecentEventsPageIsEditing = (state: StateSchema) => state.adminRecentEventsPage?._isEditing;
