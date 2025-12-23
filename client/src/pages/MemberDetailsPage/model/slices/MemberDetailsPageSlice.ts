import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from 'entities/Member';
import { MemberDetailsPageSchema } from '../types/MemberDetailsPageSchema';
import { fetchMember } from '../services/fetchMember';

const initialState: MemberDetailsPageSchema = {
    isLoading: false,
    error: undefined,
    member: undefined,
    _inited: false,
};

export const MemberDetailsPageSlice = createSlice({
    name: 'MemberDetailsPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMember.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchMember.fulfilled, (state, action: PayloadAction<Member>) => {
                state.member = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchMember.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: MemberDetailsPageActions } = MemberDetailsPageSlice;
export const { reducer: MemberDetailsPageReducer } = MemberDetailsPageSlice;
