import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document } from 'entities/Document';
import { ClinicPageSchema } from '../types/ClinicPageSchema';
import { fetchDocuments } from '../services/fetchDocuments';

const initialState: ClinicPageSchema = {
    isLoading: false,
    error: undefined,
    documents: [],
    _inited: false,
};

export const ClinicPageSlice = createSlice({
    name: 'ClinicPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocuments.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchDocuments.fulfilled, (state, action: PayloadAction<Document[]>) => {
                state.documents = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchDocuments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ClinicPageActions } = ClinicPageSlice;
export const { reducer: ClinicPageReducer } = ClinicPageSlice;
