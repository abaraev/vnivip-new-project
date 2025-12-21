import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Service } from 'entities/Service';

interface FetchServiceArgs {
    serviceId: number;
}

export const fetchService = createAsyncThunk<
    Service,
    FetchServiceArgs,
    ThunkConfig<any>
>(
    'pages/AdminServiceDetailsPage/fetchMember',
    async ({ serviceId }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Service>('/services/one', {
                params: {
                    serviceId,
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
