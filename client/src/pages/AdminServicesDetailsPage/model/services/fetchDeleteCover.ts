import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Service } from 'entities/Service';
import {
    getAdminServicesDetailsPageService,
} from '../selectors/getAdminServicesDetailsPage';

export const fetchDeleteCover = createAsyncThunk<
    Service,
    void,
    ThunkConfig<any>
>(
    'pages/AdminServiceDetailsPage/fetchDeleteAvatar',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const service = getAdminServicesDetailsPageService(getState());

        try {
            const response = await extra.api.patch<Service>('/services/delete-cover', {
                serviceId: service?.id.toString(),
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
