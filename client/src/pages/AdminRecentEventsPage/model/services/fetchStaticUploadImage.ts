import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface FetchStaticUploadImageArgs {
    file: File;
}

export interface FetchStaticUploadImageReturnData {
    fileName: string;
}

export const fetchStaticUploadImage = createAsyncThunk<
    FetchStaticUploadImageReturnData,
    FetchStaticUploadImageArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchStaticUploadImage',
    async ({ file }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await extra.api.post<FetchStaticUploadImageReturnData>(
                '/files/upload-image',
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
