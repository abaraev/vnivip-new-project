import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Service } from 'entities/Service';

export const fetchServices = createAsyncThunk<
    Service[],
    void,
    ThunkConfig<any>
>(
    'pages/AdminServicesPage/fetchVacancies',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Service[]>('/services');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
