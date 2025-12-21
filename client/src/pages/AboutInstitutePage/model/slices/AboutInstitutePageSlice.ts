import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentCard } from 'entities/ContentCard';
import { AboutInstitutePageSchema } from '../types/AboutInstitutePageSchema';
import { fetchContentCards } from '../services/fetchContentCards';

const initialState: AboutInstitutePageSchema = {
    isLoading: false,
    error: undefined,
    contentCards: [],
};

export const AboutInstitutePageSlice = createSlice({
    name: 'AboutInstitutePageSlice',
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

export const { actions: AboutInstitutePageActions } = AboutInstitutePageSlice;
export const { reducer: AboutInstitutePageReducer } = AboutInstitutePageSlice;
