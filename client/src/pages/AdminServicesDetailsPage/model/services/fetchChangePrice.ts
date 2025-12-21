import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Service } from 'entities/Service';
import {
    getAdminServicesDetailsPageService,
} from '../selectors/getAdminServicesDetailsPage';

interface FetchChangePriceArgs {
    price: string;
}

export const fetchChangePrice = createAsyncThunk<
    Service,
    FetchChangePriceArgs,
    ThunkConfig<any>
>(
    'pages/AdminServiceDetailsPage/fetchChangePrice',
    async ({ price }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const service = getAdminServicesDetailsPageService(getState());

        try {
            const response = await extra.api.patch<Service>('/services/change-price', {
                serviceId: service?.id.toString(),
                price,
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
