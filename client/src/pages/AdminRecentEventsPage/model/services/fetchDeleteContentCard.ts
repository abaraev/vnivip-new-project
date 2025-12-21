import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCard, ContentCardPages } from 'entities/ContentCard';

interface FetchDeleteContentCardArgs {
    contentCardPosition: number;
}

export interface FetchDeleteContentCardReturnData {
    contentCardPosition: number;
    contentCards: ContentCard[];
}

export const fetchDeleteContentCard = createAsyncThunk<
    FetchDeleteContentCardReturnData,
    FetchDeleteContentCardArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchDeleteContentCard',
    async ({ contentCardPosition }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.delete<ContentCard[]>(
                '/content-cards/delete',
                {
                    params: {
                        page: ContentCardPages.ABOUT_INSTITUTE,
                        contentCardPosition: contentCardPosition.toString(),
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return {
                contentCardPosition,
                contentCards: response.data,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
