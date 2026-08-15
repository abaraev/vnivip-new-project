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
    'pages/AdminEngineeringPage/fetchUpPositionContentCard',
    async ({ contentCardPosition }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.patch(
                '/content-cards/up-position',
                {
                    page: ContentCardPages.ENGINEERING,
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
