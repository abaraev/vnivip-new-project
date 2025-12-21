import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Service } from 'entities/Service';
import {
    getAdminServicesPageAddingServiceName,
    getAdminServicesPageAddingServicePrice,
} from '../selectors/getAdminServicesPage';

export const fetchAddService = createAsyncThunk<
    Service,
    void,
    ThunkConfig<any>
>(
    'pages/AdminServicesPage/fetchAddService',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const name = getAdminServicesPageAddingServiceName(getState());
        const price = getAdminServicesPageAddingServicePrice(getState());

        try {
            const response = await extra.api.post<Service>('/services', {
                name,
                price: Number(price).toString(),
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
