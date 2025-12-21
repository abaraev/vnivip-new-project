import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from 'entities/News';
import { MainPageNewsSchema } from '../types/MainPageNewsSchema';
import { fetchNewsSome } from '../services/fetchNewsSome';

const initialState: MainPageNewsSchema = {
    isLoading: false,
    error: undefined,
    _inited: false,
};

export const MainPageNewsSlice = createSlice({
    name: 'MainPageNewsSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsSome.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchNewsSome.fulfilled, (state, action: PayloadAction<News[]>) => {
                if (action.payload?.length) {
                    state.mainNews = action.payload.shift();
                    state.news = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(fetchNewsSome.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: MainPageNewsActions } = MainPageNewsSlice;
export const { reducer: MainPageNewsReducer } = MainPageNewsSlice;
