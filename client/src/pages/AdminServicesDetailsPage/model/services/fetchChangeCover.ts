import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getAdminServicesDetailsPageService,
} from '../selectors/getAdminServicesDetailsPage';

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
    'pages/AdminServicesDetailsPage/fetchChangeAvatar',
    async ({ file }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const service = getAdminServicesDetailsPageService(getState());

        if (!service?.id) {
            throw new Error();
        }

        const formData = new FormData();
        formData.append('coverImg', file);
        formData.append('serviceId', service.id.toString());

        try {
            const response = await extra.api.patch<FetchChangeCoverReturnData>(
                '/services/change-cover',
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
