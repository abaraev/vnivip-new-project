import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member, MemberSections } from 'entities/Member';
import { fetchMemberPosDown, FetchMemberPosDownResult } from 'pages/AdminMembersPage/model/services/fetchMemberPosDown';
import { fetchDeleteMember, FetchDeleteMemberResult } from 'pages/AdminMembersPage/model/services/fetchDeleteMember';
import { AdminMembersPageSchema } from '../types/AdminMembersPageSchema';
import { fetchAddMember } from '../services/fetchAddMember';
import { fetchMembers } from '../services/fetchMembers';
import { fetchMemberPosUp, FetchMemberPosUpResult } from '../services/fetchMemberPosUp';

const initialState: AdminMembersPageSchema = {
    isLoading: false,
    error: undefined,
    membersAdministration: [],
    membersGeneticResearch: [],
    membersProtozoology: [],
    membersToxicology: [],
    membersVirology: [],
    membersYoungScientists: [],
    membersAcademicCouncil: [],
    membersProductionDepartment: [],
    _inited: false,
    addingMemberFullName: '',
    addingMemberSection: '',
};

export const AdminMembersPageSlice = createSlice({
    name: 'AdminMembersPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setAddingMemberFullName: (state, action: PayloadAction<string>) => {
            state.addingMemberFullName = action.payload;
        },
        setAddingMemberSection: (state, action: PayloadAction<MemberSections | string>) => {
            state.addingMemberSection = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchMembers.fulfilled, (state, action: PayloadAction<Member[]>) => {
                action.payload.forEach((member) => {
                    switch (member.section) {
                    case MemberSections.ADMINISTRATION: {
                        state.membersAdministration.push(member);
                        break;
                    }
                    case MemberSections.DEPARTMENT_OF_MOLECULAR_GENETIC_RESEARCH: {
                        state.membersGeneticResearch.push(member);
                        break;
                    }
                    case MemberSections.DEPARTMENT_OF_PROTOZOOLOGY: {
                        state.membersProtozoology.push(member);
                        break;
                    }
                    case MemberSections.DEPARTMENT_OF_PHARMACOLOGY_AND_TOXICOLOGY: {
                        state.membersToxicology.push(member);
                        break;
                    }
                    case MemberSections.DEPARTMENT_OF_VIROLOGY: {
                        state.membersVirology.push(member);
                        break;
                    }
                    case MemberSections.COUNCIL_OF_YOUNG_SCIENTISTS: {
                        state.membersYoungScientists.push(member);
                        break;
                    }
                    case MemberSections.ACADEMIC_COUNCIL: {
                        state.membersAcademicCouncil.push(member);
                        break;
                    }
                    case MemberSections.PRODUCTION_DEPARTMENT: {
                        state.membersProductionDepartment.push(member);
                        break;
                    }
                    }
                });

                state.membersAdministration.sort((a, b) => a.position - b.position);
                state.membersGeneticResearch.sort((a, b) => a.position - b.position);
                state.membersProtozoology.sort((a, b) => a.position - b.position);
                state.membersToxicology.sort((a, b) => a.position - b.position);
                state.membersVirology.sort((a, b) => a.position - b.position);
                state.membersYoungScientists.sort((a, b) => a.position - b.position);
                state.membersAcademicCouncil.sort((a, b) => a.position - b.position);
                state.membersProductionDepartment.sort((a, b) => a.position - b.position);

                state.isLoading = false;
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchAddMember.fulfilled, (state, action: PayloadAction<Member>) => {
                const newMember = action.payload;

                switch (newMember.section) {
                case MemberSections.ADMINISTRATION: {
                    state.membersAdministration.push(newMember);
                    break;
                }
                case MemberSections.DEPARTMENT_OF_MOLECULAR_GENETIC_RESEARCH: {
                    state.membersGeneticResearch.push(newMember);
                    break;
                }
                case MemberSections.DEPARTMENT_OF_PROTOZOOLOGY: {
                    state.membersProtozoology.push(newMember);
                    break;
                }
                case MemberSections.DEPARTMENT_OF_PHARMACOLOGY_AND_TOXICOLOGY: {
                    state.membersToxicology.push(newMember);
                    break;
                }
                case MemberSections.DEPARTMENT_OF_VIROLOGY: {
                    state.membersVirology.push(newMember);
                    break;
                }
                case MemberSections.COUNCIL_OF_YOUNG_SCIENTISTS: {
                    state.membersYoungScientists.push(newMember);
                    break;
                }
                case MemberSections.ACADEMIC_COUNCIL: {
                    state.membersAcademicCouncil.push(newMember);
                    break;
                }
                case MemberSections.PRODUCTION_DEPARTMENT: {
                    state.membersProductionDepartment.push(newMember);
                    break;
                }
                }

                state.addingMemberFullName = '';
                state.addingMemberSection = '';
            })
            .addCase(fetchMemberPosUp.fulfilled, (state, action: PayloadAction<FetchMemberPosUpResult>) => {
                switch (action.payload.section) {
                case MemberSections.ADMINISTRATION: {
                    const replaceableMember = state.membersAdministration[action.payload.memberIndex - 1];
                    replaceableMember.position += 1;
                    state.membersAdministration[action.payload.memberIndex - 1] = action.payload.member;
                    state.membersAdministration[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_MOLECULAR_GENETIC_RESEARCH: {
                    const replaceableMember = state.membersGeneticResearch[action.payload.memberIndex - 1];
                    replaceableMember.position += 1;
                    state.membersGeneticResearch[action.payload.memberIndex - 1] = action.payload.member;
                    state.membersGeneticResearch[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_PROTOZOOLOGY: {
                    const replaceableMember = state.membersProtozoology[action.payload.memberIndex - 1];
                    replaceableMember.position += 1;
                    state.membersProtozoology[action.payload.memberIndex - 1] = action.payload.member;
                    state.membersProtozoology[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_PHARMACOLOGY_AND_TOXICOLOGY: {
                    const replaceableMember = state.membersToxicology[action.payload.memberIndex - 1];
                    replaceableMember.position += 1;
                    state.membersToxicology[action.payload.memberIndex - 1] = action.payload.member;
                    state.membersToxicology[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_VIROLOGY: {
                    const replaceableMember = state.membersVirology[action.payload.memberIndex - 1];
                    replaceableMember.position += 1;
                    state.membersVirology[action.payload.memberIndex - 1] = action.payload.member;
                    state.membersVirology[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.COUNCIL_OF_YOUNG_SCIENTISTS: {
                    const replaceableMember = state.membersYoungScientists[action.payload.memberIndex - 1];
                    replaceableMember.position += 1;
                    state.membersYoungScientists[action.payload.memberIndex - 1] = action.payload.member;
                    state.membersYoungScientists[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.ACADEMIC_COUNCIL: {
                    const replaceableMember = state.membersAcademicCouncil[action.payload.memberIndex - 1];
                    replaceableMember.position += 1;
                    state.membersAcademicCouncil[action.payload.memberIndex - 1] = action.payload.member;
                    state.membersAcademicCouncil[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.PRODUCTION_DEPARTMENT: {
                    const replaceableMember = state.membersProductionDepartment[action.payload.memberIndex - 1];
                    replaceableMember.position += 1;
                    state.membersProductionDepartment[action.payload.memberIndex - 1] = action.payload.member;
                    state.membersProductionDepartment[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                }
            })
            .addCase(fetchMemberPosDown.fulfilled, (state, action: PayloadAction<FetchMemberPosDownResult>) => {
                switch (action.payload.section) {
                case MemberSections.ADMINISTRATION: {
                    const replaceableMember = state.membersAdministration[action.payload.memberIndex + 1];
                    replaceableMember.position -= 1;
                    state.membersAdministration[action.payload.memberIndex + 1] = action.payload.member;
                    state.membersAdministration[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_MOLECULAR_GENETIC_RESEARCH: {
                    const replaceableMember = state.membersGeneticResearch[action.payload.memberIndex + 1];
                    replaceableMember.position -= 1;
                    state.membersGeneticResearch[action.payload.memberIndex + 1] = action.payload.member;
                    state.membersGeneticResearch[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_PROTOZOOLOGY: {
                    const replaceableMember = state.membersProtozoology[action.payload.memberIndex + 1];
                    replaceableMember.position -= 1;
                    state.membersProtozoology[action.payload.memberIndex + 1] = action.payload.member;
                    state.membersProtozoology[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_PHARMACOLOGY_AND_TOXICOLOGY: {
                    const replaceableMember = state.membersToxicology[action.payload.memberIndex + 1];
                    replaceableMember.position -= 1;
                    state.membersToxicology[action.payload.memberIndex + 1] = action.payload.member;
                    state.membersToxicology[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_VIROLOGY: {
                    const replaceableMember = state.membersVirology[action.payload.memberIndex + 1];
                    replaceableMember.position -= 1;
                    state.membersVirology[action.payload.memberIndex + 1] = action.payload.member;
                    state.membersVirology[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.COUNCIL_OF_YOUNG_SCIENTISTS: {
                    const replaceableMember = state.membersYoungScientists[action.payload.memberIndex + 1];
                    replaceableMember.position -= 1;
                    state.membersYoungScientists[action.payload.memberIndex + 1] = action.payload.member;
                    state.membersYoungScientists[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.ACADEMIC_COUNCIL: {
                    const replaceableMember = state.membersAcademicCouncil[action.payload.memberIndex + 1];
                    replaceableMember.position -= 1;
                    state.membersAcademicCouncil[action.payload.memberIndex + 1] = action.payload.member;
                    state.membersAcademicCouncil[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                case MemberSections.PRODUCTION_DEPARTMENT: {
                    const replaceableMember = state.membersProductionDepartment[action.payload.memberIndex + 1];
                    replaceableMember.position -= 1;
                    state.membersProductionDepartment[action.payload.memberIndex + 1] = action.payload.member;
                    state.membersProductionDepartment[action.payload.memberIndex] = replaceableMember;
                    break;
                }
                }
            })
            .addCase(fetchDeleteMember.fulfilled, (state, action: PayloadAction<FetchDeleteMemberResult>) => {
                switch (action.payload.section) {
                case MemberSections.ADMINISTRATION: {
                    state.membersAdministration = action.payload.members;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_MOLECULAR_GENETIC_RESEARCH: {
                    state.membersGeneticResearch = action.payload.members;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_PROTOZOOLOGY: {
                    state.membersProtozoology = action.payload.members;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_PHARMACOLOGY_AND_TOXICOLOGY: {
                    state.membersToxicology = action.payload.members;
                    break;
                }
                case MemberSections.DEPARTMENT_OF_VIROLOGY: {
                    state.membersVirology = action.payload.members;
                    break;
                }
                case MemberSections.COUNCIL_OF_YOUNG_SCIENTISTS: {
                    state.membersYoungScientists = action.payload.members;
                    break;
                }
                case MemberSections.ACADEMIC_COUNCIL: {
                    state.membersAcademicCouncil = action.payload.members;
                    break;
                }
                case MemberSections.PRODUCTION_DEPARTMENT: {
                    state.membersProductionDepartment = action.payload.members;
                    break;
                }
                }
            });
    },
});

export const { actions: AdminMembersPageActions } = AdminMembersPageSlice;
export const { reducer: AdminMembersPageReducer } = AdminMembersPageSlice;
