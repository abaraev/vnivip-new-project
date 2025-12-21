import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vacancy } from 'entities/Vacancy';
import { VacanciesPageSchema } from '../types/VacanciesPageSchema';
import { fetchVacancies } from '../services/fetchVacancies';

const initialState: VacanciesPageSchema = {
    isLoading: false,
    error: undefined,
    vacancies: [],
    _inited: false,
};

export const VacanciesPageSlice = createSlice({
    name: 'VacanciesPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacancies.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchVacancies.fulfilled, (state, action: PayloadAction<Vacancy[]>) => {
                state.vacancies = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchVacancies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: VacanciesPageActions } = VacanciesPageSlice;
export const { reducer: VacanciesPageReducer } = VacanciesPageSlice;
