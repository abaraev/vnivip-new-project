import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchNews } from './fetchNews';
import { getNewsPageHasMore, getNewsPageListIsLoading } from '../selectors/getNewsPage';

export const fetchNewsNextPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<any>
>(
    'pages/NewsPage/fetchNewsNextPage',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const hasMore = getNewsPageHasMore(getState());
        const isLoading = getNewsPageListIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(fetchNews());
        }
    },
);
