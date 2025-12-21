import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCardPages } from 'entities/ContentCard';

interface FetchMediaDeleteContentCardArgs {
    contentCardPosition: number;
}

export interface FetchMediaDeleteContentCardReturnData {
    contentCardPosition: number;
}

export const fetchMediaDeleteContentCard = createAsyncThunk<
    FetchMediaDeleteContentCardReturnData,
    FetchMediaDeleteContentCardArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchMediaDeleteContentCard',
    async ({ contentCardPosition }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.patch(
                '/content-cards/media-delete',
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
