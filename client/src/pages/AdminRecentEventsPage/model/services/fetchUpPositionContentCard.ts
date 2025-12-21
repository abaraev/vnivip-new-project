import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCardPages } from 'entities/ContentCard';

interface FetchUpPositionContentCardArgs {
    contentCardPosition: number;
}

export interface FetchUpPositionContentCardReturnData {
    contentCardPosition: number;
}

export const fetchUpPositionContentCard = createAsyncThunk<
    FetchUpPositionContentCardReturnData,
    FetchUpPositionContentCardArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchUpPositionContentCard',
    async ({ contentCardPosition }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.patch(
                '/content-cards/up-position',
                {
                    page: ContentCardPages.ABOUT_INSTITUTE,
                    contentCardPosition: contentCardPosition.toString(),
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return {
                contentCardPosition,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
