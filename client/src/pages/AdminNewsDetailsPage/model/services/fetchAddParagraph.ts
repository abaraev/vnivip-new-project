import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Paragraph } from 'entities/Paragraph';
import {
    getAdminNewsDetailsPageAddingParagraphData,
    getAdminNewsDetailsPageNews,
} from '../selectors/getAdminNewsDetailsPage';

export const fetchAddParagraph = createAsyncThunk<
    Paragraph,
    void,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchAddContentCard',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());
        const data = getAdminNewsDetailsPageAddingParagraphData(getState());

        try {
            const response = await extra.api.post<Paragraph>(
                '/paragraphs/add',
                {
                    ...data,
                    newsId: news?.id.toString(),
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
