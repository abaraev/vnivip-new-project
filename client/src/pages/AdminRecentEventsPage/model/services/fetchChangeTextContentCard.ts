import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCardPages } from 'entities/ContentCard';

interface FetchChangeTextContentCardArgs {
    text: string;
    contentCardPosition: number;
}

export const fetchChangeTextContentCard = createAsyncThunk<
    void,
    FetchChangeTextContentCardArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchChangeTextContentCard',
    async ({ text, contentCardPosition }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.patch(
                '/content-cards/change-text',
                {
                    page: ContentCardPages.ABOUT_INSTITUTE,
                    text,
                    contentCardPosition: contentCardPosition.toString(),
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
