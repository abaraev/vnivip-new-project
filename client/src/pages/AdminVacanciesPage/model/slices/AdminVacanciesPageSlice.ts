import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vacancy } from 'entities/Vacancy';
import { fetchDeleteVacancy, FetchDeleteVacancyResult } from '../services/fetchDeleteVacancy';
import { AdminVacanciesPageSchema } from '../types/AdminVacanciesPageSchema';
import { fetchAddVacancy } from '../services/fetchAddVacancy';
import { fetchVacancies } from '../services/fetchVacancies';

const initialState: AdminVacanciesPageSchema = {
    isLoading: false,
    error: undefined,
    vacancies: [],
    _inited: false,
    addingVacancyDescription: '',
    addingVacancyJobName: '',
};

export const AdminVacanciesPageSlice = createSlice({
    name: 'AdminVacanciesPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setAddingVacancyJobName: (state, action: PayloadAction<string>) => {
            state.addingVacancyJobName = action.payload;
        },
        setAddingVacancyDescription: (state, action: PayloadAction<string>) => {
            state.addingVacancyDescription = action.payload;
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
            })
            .addCase(fetchAddVacancy.fulfilled, (state, action: PayloadAction<Vacancy>) => {
                state.vacancies = [action.payload, ...state.vacancies];
                state.addingVacancyDescription = '';
                state.addingVacancyJobName = '';
            })
            .addCase(fetchDeleteVacancy.fulfilled, (state, action: PayloadAction<FetchDeleteVacancyResult>) => {
                state.vacancies.splice(action.payload.vacancyIndex, 1);
            });
    },
});

export const { actions: AdminVacanciesPageActions } = AdminVacanciesPageSlice;
export const { reducer: AdminVacanciesPageReducer } = AdminVacanciesPageSlice;
