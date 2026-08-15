import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentCard } from 'entities/ContentCard';
import { EngineeringPageSchema } from '../types/EngineeringPageSchema';
import { fetchContentCards } from '../services/fetchContentCards';

const initialState: EngineeringPageSchema = {
    isLoading: false,
    error: undefined,
    contentCards: [],
};

export const EngineeringPageSlice = createSlice({
    name: 'EngineeringPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContentCards.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchContentCards.fulfilled, (state, action: PayloadAction<ContentCard[]>) => {
                state.contentCards = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchContentCards.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: EngineeringPageActions } = EngineeringPageSlice;
export const { reducer: EngineeringPageReducer } = EngineeringPageSlice;
