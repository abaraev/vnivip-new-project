import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchDownPositionParagraphArgs {
    paragraphPosition: number;
}

export interface FetchDownPositionParagraphReturnData {
    paragraphPosition: number;
}

export const fetchDownPositionParagraph = createAsyncThunk<
    FetchDownPositionParagraphReturnData,
    FetchDownPositionParagraphArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchDownPositionParagraph',
    async ({ paragraphPosition }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        try {
            const response = await extra.api.patch(
                '/paragraphs/down-position',
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
