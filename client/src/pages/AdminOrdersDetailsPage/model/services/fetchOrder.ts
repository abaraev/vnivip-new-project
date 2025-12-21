import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Order } from 'entities/Order';

interface FetchOrderArgs {
    orderId: number;
}

export const fetchOrder = createAsyncThunk<
    Order,
    FetchOrderArgs,
    ThunkConfig<any>
>(
    'pages/AdminOrdersDetailsPage/fetchMember',
    async ({ orderId }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Order>('/orders/one', {
                params: {
                    orderId,
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
