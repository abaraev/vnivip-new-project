import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member, MemberSections } from 'entities/Member';
import { ScienceDepartmentsPageSchema } from '../types/ScienceDepartmentsPageSchema';
import { fetchScienceDepartmentsMembers } from '../services/fetchScienceDepartmentsMembers';

const initialState: ScienceDepartmentsPageSchema = {
    isLoading: false,
    error: undefined,
    membersVirology: [],
    membersMolecular: [],
    membersProduction: [],
    membersPharmacology: [],
    membersProtozoology: [],
    _inited: false,
};

export const ScienceDepartmentsPageSlice = createSlice({
    name: 'ScienceDepartmentsPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScienceDepartmentsMembers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchScienceDepartmentsMembers.fulfilled, (state, action: PayloadAction<Member[]>) => {
                action.payload.sort((a, b) => a.position - b.position).forEach((member, index) => {
                    if (member.section === MemberSections.PRODUCTION_DEPARTMENT) {
                        state.membersProduction.push(member);
                    } else if (member.section === MemberSections.DEPARTMENT_OF_MOLECULAR_GENETIC_RESEARCH) {
                        state.membersMolecular.push(member);
                    } else if (member.section === MemberSections.DEPARTMENT_OF_VIROLOGY) {
                        state.membersVirology.push(member);
                    } else if (member.section === MemberSections.DEPARTMENT_OF_PROTOZOOLOGY) {
                        state.membersProtozoology.push(member);
                    } else if (member.section === MemberSections.DEPARTMENT_OF_PHARMACOLOGY_AND_TOXICOLOGY) {
                        state.membersPharmacology.push(member);
                    }
                });
                state.isLoading = false;
            })
            .addCase(fetchScienceDepartmentsMembers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ScienceDepartmentsPageActions } = ScienceDepartmentsPageSlice;
export const { reducer: ScienceDepartmentsPageReducer } = ScienceDepartmentsPageSlice;
