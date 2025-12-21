import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCardPages } from 'entities/ContentCard';

interface FetchUploadImageArgs {
    file: File;
    contentCardPosition: number;
}

export interface FetchUploadImageReturnData {
    fileName: string;
    contentCardPosition: number;
}

export const fetchUploadImage = createAsyncThunk<
    FetchUploadImageReturnData,
    FetchUploadImageArgs,
    ThunkConfig<any>
>(
    'pages/AdminRecentEventsPage/fetchUploadImage',
    async ({ file, contentCardPosition }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('contentCardPosition', contentCardPosition.toString());
        formData.append('page', ContentCardPages.ABOUT_INSTITUTE);

        try {
            const response = await extra.api.patch<FetchUploadImageReturnData>(
                '/content-cards/upload-image',
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
