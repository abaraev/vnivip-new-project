import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { News } from 'entities/News';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

export const fetchChangeDate = createAsyncThunk<
    News,
    void,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchChangeDate',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        try {
            const response = await extra.api.patch<News>(
                '/news/change-date',
                {
                    newsId: news?.id.toString(),
                    timestamp: news?.timestamp,
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
