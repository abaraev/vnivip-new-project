import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchMediaDeleteParagraphArgs {
    paragraphPosition: number;
}

export interface FetchMediaDeleteParagraphReturnData {
    paragraphPosition: number;
}

export const fetchMediaDeleteParagraph = createAsyncThunk<
    FetchMediaDeleteParagraphReturnData,
    FetchMediaDeleteParagraphArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchMediaDeleteParagraph',
    async ({ paragraphPosition }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        if (!news?.id) {
            throw new Error();
        }

        try {
            const response = await extra.api.patch(
                '/paragraphs/media-delete',
                {
                    newsId: news?.id.toString(),
                    paragraphPosition: paragraphPosition.toString(),
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return {
                paragraphPosition,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
