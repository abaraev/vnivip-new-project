import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Vacancy } from 'entities/Vacancy';

interface FetchDeleteVacancyArgs {
    vacancyIndex: number;
    vacancyId: number;
}

export interface FetchDeleteVacancyResult {
    vacancyIndex: number;
    vacancy: Vacancy;
}

export const fetchDeleteVacancy = createAsyncThunk<
    FetchDeleteVacancyResult,
    FetchDeleteVacancyArgs,
    ThunkConfig<any>
>(
    'pages/AdminVacanciesDetailsPage/fetchDeleteVacancy',
    async ({
        vacancyIndex, vacancyId,
    }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.delete<Vacancy>('/vacancies', {
                params: {
                    vacancyId: vacancyId.toString(),
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return {
                vacancy: response.data,
                vacancyIndex,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
