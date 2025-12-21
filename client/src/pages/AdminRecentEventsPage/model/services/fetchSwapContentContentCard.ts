import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCardPages } from 'entities/ContentCard';

interface FetchSwapContentContentCardArgs {
    contentCardPosition: number;
}

export interface FetchSwapContentContentCardReturnData {
    contentCardPosition: number;
}

export const fetchSwapContentContentCard = createAsyncThunk<
    FetchSwapContentContentCardReturnData,
    FetchSwapContentContentCardArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchSwapContentContentCard',
    async ({ contentCardPosition }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.patch(
                '/content-cards/swap-content',
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
