import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Competition } from 'entities/Competition';
import {
    getAdminCompetitionsPageAddingCompetitionDescription,
    getAdminCompetitionsPageAddingCompetitionName,
} from '../selectors/getAdminCompetitionsPage';

export const fetchAddCompetition = createAsyncThunk<
    Competition,
    void,
    ThunkConfig<any>
>(
    'pages/AdminCompetitionsPage/fetchAddVacancy',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const name = getAdminCompetitionsPageAddingCompetitionName(getState());
        const description = getAdminCompetitionsPageAddingCompetitionDescription(getState());

        try {
            const response = await extra.api.post<Competition>('/competitions', {
                name,
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
