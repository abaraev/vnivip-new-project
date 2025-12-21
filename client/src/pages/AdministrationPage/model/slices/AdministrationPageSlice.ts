import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from 'entities/Member';
import { fetchAdministrationMembers } from '../services/fetchAdministrationMembers';
import { AdministrationPageSchema } from '../types/AdministrationPageSchema';

const initialState: AdministrationPageSchema = {
    isLoading: false,
    error: undefined,
    members: [],
    _inited: false,
};

export const AdministrationPageSlice = createSlice({
    name: 'AdministrationPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdministrationMembers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAdministrationMembers.fulfilled, (state, action: PayloadAction<Member[]>) => {
                state.members = action.payload.sort((a, b) => a.position - b.position);
                state.isLoading = false;
            })
            .addCase(fetchAdministrationMembers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: AdministrationPageActions } = AdministrationPageSlice;
export const { reducer: AdministrationPageReducer } = AdministrationPageSlice;
