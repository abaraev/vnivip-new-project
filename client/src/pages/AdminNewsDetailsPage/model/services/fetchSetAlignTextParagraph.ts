import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ParagraphAlignText } from 'entities/Paragraph';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchSetAlignTextParagraphArgs {
    paragraphPosition: number;
    alignText: ParagraphAlignText;
}

export interface FetchSetAlignTextParagraphReturnData {
    paragraphPosition: number;
    alignText: ParagraphAlignText;
}

export const fetchSetAlignTextParagraph = createAsyncThunk<
    FetchSetAlignTextParagraphReturnData,
    FetchSetAlignTextParagraphArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchSetAlignTextParagraph',
    async ({ paragraphPosition, alignText }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        try {
            const response = await extra.api.patch(
                '/paragraphs/set-align-text',
                {
                    newsId: news?.id.toString(),
                    paragraphPosition: paragraphPosition.toString(),
                    alignText,
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return {
                paragraphPosition,
                alignText,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
