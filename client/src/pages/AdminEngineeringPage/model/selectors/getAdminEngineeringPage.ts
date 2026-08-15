import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminEngineeringPageIsLoading = (state: StateSchema) => state.adminEngineeringPage?.isLoading;
export const getAdminEngineeringPageError = (state: StateSchema) => state.adminEngineeringPage?.error;
export const getAdminEngineeringPageAddingContentCardData = (state: StateSchema) => state.adminEngineeringPage?.addingContentCardData;
export const getAdminEngineeringPageInited = (state: StateSchema) => state.adminEngineeringPage?._inited;
export const getAdminEngineeringPageIsEditing = (state: StateSchema) => state.adminEngineeringPage?._isEditing;
