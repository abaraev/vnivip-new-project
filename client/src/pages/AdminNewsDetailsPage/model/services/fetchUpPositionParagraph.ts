import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchUpPositionParagraphArgs {
    paragraphPosition: number;
}

export interface FetchUpPositionParagraphReturnData {
    paragraphPosition: number;
}

export const fetchUpPositionParagraph = createAsyncThunk<
    FetchUpPositionParagraphReturnData,
    FetchUpPositionParagraphArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchUpPositionParagraph',
    async ({ paragraphPosition }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        try {
            const response = await extra.api.patch(
                '/paragraphs/up-position',
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
