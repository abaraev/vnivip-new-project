import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCardPages } from 'entities/ContentCard';

interface FetchUploadVideoArgs {
    file: File;
    contentCardPosition: number;
}

export interface FetchUploadVideoReturnData {
    videoFileName: string;
    posterFileName: string;
    contentCardPosition: number;
}

export const fetchUploadVideo = createAsyncThunk<
    FetchUploadVideoReturnData,
    FetchUploadVideoArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchUploadVideo',
    async ({ file, contentCardPosition }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const formData = new FormData();
        formData.append('video', file);
        formData.append('contentCardPosition', contentCardPosition.toString());
        formData.append('page', ContentCardPages.ABOUT_INSTITUTE);

        try {
            const response = await extra.api.patch<FetchUploadVideoReturnData>(
                '/content-cards/upload-video',
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
                contentCardPosition,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
