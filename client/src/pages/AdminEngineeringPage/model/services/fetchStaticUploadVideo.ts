import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface FetchStaticUploadVideoArgs {
    file: File;
}

export interface FetchStaticUploadVideoReturnData {
    videoFileName: string,
    posterFileName: string,
}

export const fetchStaticUploadVideo = createAsyncThunk<
    FetchStaticUploadVideoReturnData,
    FetchStaticUploadVideoArgs,
    ThunkConfig<any>
>(
    'pages/AdminEngineeringPage/fetchStaticUploadVideo',
    async ({ file }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const formData = new FormData();
        formData.append('video', file);

        try {
            const response = await extra.api.post<FetchStaticUploadVideoReturnData>(
                '/files/upload-video',
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
