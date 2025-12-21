import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { News } from 'entities/News';
import { getAdminNewsDetailsPageDescription, getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

export const fetchChangeDescription = createAsyncThunk<
    News,
    void,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchChangeDescription',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const description = getAdminNewsDetailsPageDescription(getState());
        const news = getAdminNewsDetailsPageNews(getState());

        try {
            const response = await extra.api.patch<News>(
                '/news/change-description',
                {
                    description,
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
