import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Service } from 'entities/Service';
import {
    getAdminServicesDetailsPageService,
} from '../selectors/getAdminServicesDetailsPage';

interface FetchChangeNameArgs {
    name: string;
}

export const fetchChangeName = createAsyncThunk<
    Service,
    FetchChangeNameArgs,
    ThunkConfig<any>
>(
    'pages/AdminServiceDetailsPage/fetchChangeFullName',
    async ({ name }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const service = getAdminServicesDetailsPageService(getState());

        try {
            const response = await extra.api.patch<Service>('/services/change-name', {
                serviceId: service?.id.toString(),
                name,
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
