import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { News } from 'entities/News';
import {
    getNewsPageLimit, getNewsPageOrder, getNewsPagePage, getNewsPageSearch,
} from '../selectors/getNewsPage';

export const fetchNews = createAsyncThunk<
    News[],
    void,
    ThunkConfig<any>
>(
    'pages/NewsPage/fetchNews',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const page = getNewsPagePage(getState());
        const search = getNewsPageSearch(getState());
        const limit = getNewsPageLimit(getState());
        const order = getNewsPageOrder(getState());

        try {
            const response = await extra.api.get<News[]>('/news/part', {
                params: {
                    page,
                    limit,
                    search,
                    order,
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
