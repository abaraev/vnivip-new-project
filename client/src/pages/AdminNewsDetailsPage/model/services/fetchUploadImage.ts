import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchUploadImageArgs {
    file: File;
    paragraphPosition: number;
}

export interface FetchUploadImageReturnData {
    fileName: string;
    paragraphPosition: number;
}

export const fetchUploadImage = createAsyncThunk<
    FetchUploadImageReturnData,
    FetchUploadImageArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchUploadImage',
    async ({ file, paragraphPosition }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        if (!news?.id) {
            throw new Error();
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('paragraphPosition', paragraphPosition.toString());
        formData.append('newsId', news.id.toString());

        try {
            const response = await extra.api.patch<FetchUploadImageReturnData>(
                '/paragraphs/upload-image',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return {
                ...response.data,
                paragraphPosition,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
