import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCardAlignText, ContentCardPages } from 'entities/ContentCard';

interface FetchSetAlignTextContentCardArgs {
    contentCardPosition: number;
    alignText: ContentCardAlignText;
}

export interface FetchSetAlignTextContentCardReturnData {
    contentCardPosition: number;
    alignText: ContentCardAlignText;
}

export const fetchSetAlignTextContentCard = createAsyncThunk<
    FetchSetAlignTextContentCardReturnData,
    FetchSetAlignTextContentCardArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchSetAlignTextContentCard',
    async ({ contentCardPosition, alignText }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.patch(
                '/content-cards/set-align-text',
                {
                    page: ContentCardPages.ABOUT_INSTITUTE,
                    contentCardPosition: contentCardPosition.toString(),
                    alignText,
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return {
                contentCardPosition,
                alignText,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
