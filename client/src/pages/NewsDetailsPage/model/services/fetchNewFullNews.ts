import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getNewsDetailsPageNews } from '../selectors/getNewsDetailsPage';
import { fetchFullNews } from './fetchFullNews';

interface FetchFullNewsArgs {
    newsId: number;
}

export const fetchNewFullNews = createAsyncThunk<
    void,
    FetchFullNewsArgs,
    ThunkConfig<any>
>(
    'pages/NewsDetailsPage/fetchNewFullNews',
    async ({ newsId }, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const news = getNewsDetailsPageNews(getState());

        if (news?.id !== newsId) {
            dispatch(fetchFullNews({ newsId }));
        }
    },
);
