import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Competition } from 'entities/Competition';

interface FetchCloseCompetitionArgs {
    competitionIndex: number;
    competitionId: number;
}

export interface FetchCloseCompetitionResult {
    competitionIndex: number;
    competition: Competition;
}

export const fetchCloseCompetition = createAsyncThunk<
    FetchCloseCompetitionResult,
    FetchCloseCompetitionArgs,
    ThunkConfig<any>
>(
    'pages/AdminCompetitionsDetailsPage/fetchCloseCompetition',
    async ({
        competitionIndex, competitionId,
    }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.patch<Competition>('/competitions/close', {
                competitionId: competitionId.toString(),
            });

            if (!response.data) {
                throw new Error();
            }

            return {
                competition: response.data,
                competitionIndex,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
