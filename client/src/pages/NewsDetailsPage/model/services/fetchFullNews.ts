import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { News } from 'entities/News';

interface FetchFullNewsArgs {
    newsId: number;
}

export const fetchFullNews = createAsyncThunk<
    News,
    FetchFullNewsArgs,
    ThunkConfig<any>
>(
    'pages/NewsDetailsPage/fetchMember',
    async ({ newsId }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<News>('/news/full', {
                params: {
                    newsId,
                },
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
