import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchSwapContentParagraphArgs {
    paragraphPosition: number;
}

export interface FetchSwapContentParagraphReturnData {
    paragraphPosition: number;
}

export const fetchSwapContentParagraph = createAsyncThunk<
    FetchSwapContentParagraphReturnData,
    FetchSwapContentParagraphArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchSwapContentParagraph',
    async ({ paragraphPosition }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        try {
            const response = await extra.api.patch(
                '/paragraphs/swap-content',
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
