import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { News } from 'entities/News';

interface FetchNewsArgs {
    newsId: number;
}

export const fetchNews = createAsyncThunk<
    News,
    FetchNewsArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchNews',
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
