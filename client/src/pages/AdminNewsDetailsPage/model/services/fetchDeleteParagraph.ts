import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Paragraph } from 'entities/Paragraph';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchDeleteParagraphArgs {
    paragraphPosition: number;
}

export interface FetchDeleteParagraphReturnData {
    paragraphPosition: number;
    paragraphs: Paragraph[];
}

export const fetchDeleteParagraph = createAsyncThunk<
    FetchDeleteParagraphReturnData,
    FetchDeleteParagraphArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchDeleteParagraph',
    async ({ paragraphPosition }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        if (!news?.id) {
            throw new Error();
        }

        try {
            const response = await extra.api.delete<Paragraph[]>(
                '/paragraphs/delete',
                {
                    params: {
                        newsId: news?.id.toString(),
                        paragraphPosition: paragraphPosition.toString(),
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return {
                paragraphPosition,
                paragraphs: response.data,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
