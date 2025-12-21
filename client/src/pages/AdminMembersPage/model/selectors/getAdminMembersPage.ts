import { StateSchema } from 'app/providers/StoreProvider';

export const getAdminMembersPageMembersAdministration = (state: StateSchema) => state.adminMembersPage?.membersAdministration;
export const getAdminMembersPageMembersAcademicCouncil = (state: StateSchema) => state.adminMembersPage?.membersAcademicCouncil;
export const getAdminMembersPageMembersYoungScientists = (state: StateSchema) => state.adminMembersPage?.membersYoungScientists;
export const getAdminMembersPageMembersVirology = (state: StateSchema) => state.adminMembersPage?.membersVirology;
export const getAdminMembersPageMembersGeneticResearch = (state: StateSchema) => state.adminMembersPage?.membersGeneticResearch;
export const getAdminMembersPageMembersProtozoology = (state: StateSchema) => state.adminMembersPage?.membersProtozoology;
export const getAdminMembersPageMembersToxicology = (state: StateSchema) => state.adminMembersPage?.membersToxicology;
export const getAdminMembersPageMembersProductionDepartment = (state: StateSchema) => state.adminMembersPage?.membersProductionDepartment;
export const getAdminMembersPageAddingMemberFullName = (state: StateSchema) => state.adminMembersPage?.addingMemberFullName;
export const getAdminMembersPageAddingMemberSection = (state: StateSchema) => state.adminMembersPage?.addingMemberSection;
export const getAdminMembersPageIsLoading = (state: StateSchema) => state.adminMembersPage?.isLoading;
export const getAdminMembersPageError = (state: StateSchema) => state.adminMembersPage?.error;
export const getAdminMembersPageInited = (state: StateSchema) => state.adminMembersPage?._inited;
