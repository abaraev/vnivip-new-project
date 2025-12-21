import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchChangeTextParagraphArgs {
    text: string;
    paragraphPosition: number;
}

export const fetchChangeTextParagraph = createAsyncThunk<
    void,
    FetchChangeTextParagraphArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchChangeTextParagraph',
    async ({ text, paragraphPosition }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        if (!news?.id) {
            throw new Error();
        }

        try {
            const response = await extra.api.patch(
                '/paragraphs/change-text',
                {
                    newsId: news.id.toString(),
                    text,
                    paragraphPosition: paragraphPosition.toString(),
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
