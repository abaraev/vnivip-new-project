import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { News } from 'entities/News';
import {
    getAdminNewsPageLimit, getAdminNewsPageOrder, getAdminNewsPagePage, getAdminNewsPageSearch,
} from '../selectors/getAdminNewsPage';

export const fetchNews = createAsyncThunk<
    News[],
    void,
    ThunkConfig<any>
>(
    'pages/AdminNewsPage/fetchNews',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const page = getAdminNewsPagePage(getState());
        const search = getAdminNewsPageSearch(getState());
        const limit = getAdminNewsPageLimit(getState());
        const order = getAdminNewsPageOrder(getState());

        try {
            const response = await extra.api.get<News[]>('/news/admin-part', {
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
