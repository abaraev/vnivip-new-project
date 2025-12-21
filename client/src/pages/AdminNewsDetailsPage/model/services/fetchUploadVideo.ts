import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchUploadVideoArgs {
    file: File;
    paragraphPosition: number;
}

export interface FetchUploadVideoReturnData {
    videoFileName: string;
    posterFileName: string;
    paragraphPosition: number;
}

export const fetchUploadVideo = createAsyncThunk<
    FetchUploadVideoReturnData,
    FetchUploadVideoArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchUploadVideo',
    async ({ file, paragraphPosition }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        if (!news?.id) {
            throw new Error();
        }

        const formData = new FormData();
        formData.append('video', file);
        formData.append('paragraphPosition', paragraphPosition.toString());
        formData.append('newsId', news.id.toString());

        try {
            const response = await extra.api.patch<FetchUploadVideoReturnData>(
                '/paragraphs/upload-video',
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
