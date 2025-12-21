import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Competition } from 'entities/Competition';
import { CompetitionsPageSchema } from '../types/CompetitionsPageSchema';
import { fetchCompetitions } from '../services/fetchCompetitions';

const initialState: CompetitionsPageSchema = {
    isLoading: false,
    error: undefined,
    competitions: [],
    _inited: false,
};

export const CompetitionsPageSlice = createSlice({
    name: 'CompetitionsPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompetitions.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCompetitions.fulfilled, (state, action: PayloadAction<Competition[]>) => {
                state.competitions = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCompetitions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: CompetitionsPageActions } = CompetitionsPageSlice;
export const { reducer: CompetitionsPageReducer } = CompetitionsPageSlice;
