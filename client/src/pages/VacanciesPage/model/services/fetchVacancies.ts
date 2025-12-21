import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Vacancy } from 'entities/Vacancy';

export const fetchVacancies = createAsyncThunk<
    Vacancy[],
    void,
    ThunkConfig<any>
>(
    'pages/VacanciesPage/fetchActs',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Vacancy[]>('/vacancies');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
