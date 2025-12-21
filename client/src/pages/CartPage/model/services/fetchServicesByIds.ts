import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Service } from 'entities/Service';
import { getCart } from 'entities/Cart';

export const fetchServicesByIds = createAsyncThunk<
    Service[],
    void,
    ThunkConfig<any>
>(
    'pages/CartPage/fetchServicesByIds',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const cart = getCart(getState());

        if (!cart?.length) {
            return [] as Service[];
        }

        const idsArr = cart?.map((service) => service.id);
        const ids = idsArr.join(',');

        try {
            const response = await extra.api.get<Service[]>('/services/part', {
                params: {
                    ids,
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
