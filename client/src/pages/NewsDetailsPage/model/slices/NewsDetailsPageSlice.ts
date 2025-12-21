import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from 'entities/News';
import { fetchFullNews } from '../services/fetchFullNews';
import { NewsDetailsPageSchema } from '../types/NewsDetailsPageSchema';

const initialState: NewsDetailsPageSchema = {
    isLoading: false,
    error: undefined,
    _inited: false,
};

export const NewsDetailsPageSlice = createSlice({
    name: 'NewsDetailsPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFullNews.pending, (state) => {
                state.isLoading = true;
                state.news = undefined;
                state.error = undefined;
            })
            .addCase(fetchFullNews.fulfilled, (state, action: PayloadAction<News>) => {
                state.news = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchFullNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: NewsDetailsPageActions } = NewsDetailsPageSlice;
export const { reducer: NewsDetailsPageReducer } = NewsDetailsPageSlice;
