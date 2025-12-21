import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminNewsDetailsPageNews } from '../selectors/getAdminNewsDetailsPage';

interface FetchChangeCoverArgs {
    file: File;
}

export interface FetchChangeCoverReturnData {
    fileName: string;
}

export const fetchChangeCover = createAsyncThunk<
    FetchChangeCoverReturnData,
    FetchChangeCoverArgs,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchChangeAvatar',
    async ({ file }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const news = getAdminNewsDetailsPageNews(getState());

        if (!news?.id) {
            throw new Error();
        }

        const formData = new FormData();
        formData.append('coverImg', file);
        formData.append('newsId', news.id.toString());

        try {
            const response = await extra.api.patch<FetchChangeCoverReturnData>(
                '/news/change-cover',
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

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
