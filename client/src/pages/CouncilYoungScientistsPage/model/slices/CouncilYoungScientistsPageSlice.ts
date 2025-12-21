import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from 'entities/Member';
import { CouncilYoungScientistsPageSchema } from '../types/CouncilYoungScientistsPageSchema';
import { fetchCouncilYoungScientistsMembers } from '../services/fetchCouncilYoungScientistsMembers';

const initialState: CouncilYoungScientistsPageSchema = {
    isLoading: false,
    error: undefined,
    members: [],
    _inited: false,
};

export const CouncilYoungScientistsPageSlice = createSlice({
    name: 'CouncilYoungScientistsPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCouncilYoungScientistsMembers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCouncilYoungScientistsMembers.fulfilled, (state, action: PayloadAction<Member[]>) => {
                state.members = action.payload.sort((a, b) => a.position - b.position);
                state.isLoading = false;
            })
            .addCase(fetchCouncilYoungScientistsMembers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: CouncilYoungScientistsPageActions } = CouncilYoungScientistsPageSlice;
export const { reducer: CouncilYoungScientistsPageReducer } = CouncilYoungScientistsPageSlice;
