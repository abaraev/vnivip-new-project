import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from 'entities/Member';
import { fetchAcademicCouncilMembers } from '../services/fetchAcademicCouncilMembers';
import { AcademicCouncilPageSchema } from '../types/AcademicCouncilPageSchema';

const initialState: AcademicCouncilPageSchema = {
    isLoading: false,
    error: undefined,
    members: [],
    _inited: false,
};

export const AcademicCouncilPageSlice = createSlice({
    name: 'AdministrationPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAcademicCouncilMembers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAcademicCouncilMembers.fulfilled, (state, action: PayloadAction<Member[]>) => {
                state.members = action.payload.sort((a, b) => a.position - b.position);
                state.isLoading = false;
            })
            .addCase(fetchAcademicCouncilMembers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: AcademicCouncilPageActions } = AcademicCouncilPageSlice;
export const { reducer: AcademicCouncilPageReducer } = AcademicCouncilPageSlice;
