import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchNews } from './fetchNews';
import { getAdminNewsPageHasMore, getAdminNewsPageListIsLoading } from '../selectors/getAdminNewsPage';

export const fetchNewsNextPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<any>
>(
    'pages/AdminNewsPage/fetchNewsNextPage',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const hasMore = getAdminNewsPageHasMore(getState());
        const isLoading = getAdminNewsPageListIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(fetchNews());
        }
    },
);
