import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { News } from 'entities/News';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

export const fetchDeleteNews = createAsyncThunk<
    News,
    void,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchDeleteNews',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        try {
            const response = await extra.api.delete<News>(
                '/news',
                {
                    params: {
                        newsId: news?.id.toString(),
                    },
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
