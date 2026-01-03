import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Competition } from 'entities/Competition';
import { AxiosResponse } from 'axios';
import {
    getAdminCompetitionsPageAddingCompetitionDescription,
    getAdminCompetitionsPageAddingCompetitionDocuments,
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
        const documents = getAdminCompetitionsPageAddingCompetitionDocuments(getState());

        try {
            let response: AxiosResponse<Competition>;

            if (documents?.length) {
                response = await extra.api.post<Competition>('/competitions', {
                    name,
                    description,
                    documents: JSON.stringify(documents),
                });
            } else {
                response = await extra.api.post<Competition>('/competitions', {
                    name,
                    description,
                });
            }

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
