import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { News } from 'entities/News';

export const fetchMainNews = createAsyncThunk<
    News,
    void,
    ThunkConfig<any>
>(
    'pages/NewsPage/fetchMainNews',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<News>('/news/main');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
