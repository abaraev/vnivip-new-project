import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Vacancy } from 'entities/Vacancy';
import {
    getAdminVacanciesPageAddingVacancyDescription,
    getAdminVacanciesPageAddingVacancyJobName,
} from '../selectors/getAdminVacanciesPage';

export const fetchAddVacancy = createAsyncThunk<
    Vacancy,
    void,
    ThunkConfig<any>
>(
    'pages/AdminVacanciesPage/fetchAddVacancy',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const jobName = getAdminVacanciesPageAddingVacancyJobName(getState());
        const description = getAdminVacanciesPageAddingVacancyDescription(getState());

        try {
            const response = await extra.api.post<Vacancy>('/vacancies', {
                jobName,
                description,
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
