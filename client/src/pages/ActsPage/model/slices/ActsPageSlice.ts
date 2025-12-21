import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document } from 'entities/Document';
import { ActsPageSchema } from '../types/ActsPageSchema';
import { fetchDocuments } from '../services/fetchDocuments';

const initialState: ActsPageSchema = {
    isLoading: false,
    error: undefined,
    documents: [],
    _inited: false,
};

export const ActsPageSlice = createSlice({
    name: 'ActsPageSlice',
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

export const { actions: ActsPageActions } = ActsPageSlice;
export const { reducer: ActsPageReducer } = ActsPageSlice;
