import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCard, ContentCardPages } from 'entities/ContentCard';
import { getAdminRecentEventsPageAddingContentCardData } from '../selectors/getAdminRecentEventsPage';

export const fetchAddContentCard = createAsyncThunk<
    ContentCard,
    void,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchAddContentCard',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const data = getAdminRecentEventsPageAddingContentCardData(getState());

        try {
            const response = await extra.api.post<ContentCard>(
                '/content-cards/add',
                {
                    ...data,
                    page: ContentCardPages.ABOUT_INSTITUTE,
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
