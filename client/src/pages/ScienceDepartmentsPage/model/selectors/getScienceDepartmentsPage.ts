import { StateSchema } from 'app/providers/StoreProvider';

export const getScienceDepartmentsPageMembersVirology = (state: StateSchema) => state.scienceDepartmentsPage?.membersVirology;
export const getScienceDepartmentsPageMembersPharmacology = (state: StateSchema) => state.scienceDepartmentsPage?.membersPharmacology;
export const getScienceDepartmentsPageMembersProtozoology = (state: StateSchema) => state.scienceDepartmentsPage?.membersProtozoology;
export const getScienceDepartmentsPageMembersMolecular = (state: StateSchema) => state.scienceDepartmentsPage?.membersMolecular;
export const getScienceDepartmentsPageMembersProduction = (state: StateSchema) => state.scienceDepartmentsPage?.membersProduction;
export const getScienceDepartmentsPageIsLoading = (state: StateSchema) => state.scienceDepartmentsPage?.isLoading;
export const getScienceDepartmentsPageError = (state: StateSchema) => state.scienceDepartmentsPage?.error;
export const getScienceDepartmentsPageInited = (state: StateSchema) => state.scienceDepartmentsPage?._inited;
