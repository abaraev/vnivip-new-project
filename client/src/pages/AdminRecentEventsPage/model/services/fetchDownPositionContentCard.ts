import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCardPages } from 'entities/ContentCard';

interface FetchDownPositionContentCardArgs {
    contentCardPosition: number;
}

export interface FetchDownPositionContentCardReturnData {
    contentCardPosition: number;
}

export const fetchDownPositionContentCard = createAsyncThunk<
    FetchDownPositionContentCardReturnData,
    FetchDownPositionContentCardArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchDownPositionContentCard',
    async ({ contentCardPosition }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.patch(
                '/content-cards/down-position',
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
