import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Competition } from 'entities/Competition';

interface FetchOpenCompetitionArgs {
    competitionIndex: number;
    competitionId: number;
}

export interface FetchOpenCompetitionResult {
    competitionIndex: number;
    competition: Competition;
}

export const fetchOpenCompetition = createAsyncThunk<
    FetchOpenCompetitionResult,
    FetchOpenCompetitionArgs,
    ThunkConfig<any>
>(
    'pages/AdminCompetitionsDetailsPage/fetchOpenCompetition',
    async ({
        competitionIndex, competitionId,
    }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.patch<Competition>('/competitions/open', {
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
