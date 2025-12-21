import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { News } from 'entities/News';
import { getAdminNewsDetailsPageNews, getAdminNewsDetailsPageTitle } from '../selectors/getAdminNewsDetailsPage';

export const fetchChangeTitle = createAsyncThunk<
    News,
    void,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchChangeTitle',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const title = getAdminNewsDetailsPageTitle(getState());
        const news = getAdminNewsDetailsPageNews(getState());

        try {
            const response = await extra.api.patch<News>(
                '/news/change-title',
                {
                    title,
                    newsId: news?.id.toString(),
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
