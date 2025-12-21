import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Order } from 'entities/Order';
import {
    getAdminOrdersDetailsPageOrder,
    getAdminOrdersDetailsPageOrderStatus,
} from '../selectors/getAdminOrdersDetailsPage';

export const fetchSetStatus = createAsyncThunk<
    Order,
    void,
    ThunkConfig<any>
>(
    'pages/AdminOrdersDetailsPage/fetchSetStatus',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const order = getAdminOrdersDetailsPageOrder(getState());
        const orderStatus = getAdminOrdersDetailsPageOrderStatus(getState());

        try {
            const response = await extra.api.patch<Order>('/orders/set-status', {
                orderId: order?.id.toString(),
                status: orderStatus,
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
