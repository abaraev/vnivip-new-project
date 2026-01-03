import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Competition } from 'entities/Competition';

interface FetchDeleteCompetitionArgs {
    competitionIndex: number;
    competitionId: number;
}

export interface FetchDeleteCompetitionResult {
    competitionIndex: number;
    competition: Competition;
}

export const fetchDeleteCompetition = createAsyncThunk<
    FetchDeleteCompetitionResult,
    FetchDeleteCompetitionArgs,
    ThunkConfig<any>
>(
    'pages/AdminCompetitionsDetailsPage/fetchDeleteCompetition',
    async ({
        competitionIndex, competitionId,
    }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.delete<Competition>('/competitions', {
                params: {
                    competitionId: competitionId.toString(),
                },
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
