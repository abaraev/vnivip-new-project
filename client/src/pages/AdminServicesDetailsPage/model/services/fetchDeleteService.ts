import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Service } from 'entities/Service';
import {
    getAdminServicesDetailsPageService,
} from '../selectors/getAdminServicesDetailsPage';

export const fetchDeleteService = createAsyncThunk<
    Service,
    void,
    ThunkConfig<any>
>(
    'pages/AdminServiceDetailsPage/fetchDeleteMember',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const service = getAdminServicesDetailsPageService(getState());

        try {
            const response = await extra.api.delete<Service>('/services', {
                params: {
                    serviceId: service?.id.toString(),
                },
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
