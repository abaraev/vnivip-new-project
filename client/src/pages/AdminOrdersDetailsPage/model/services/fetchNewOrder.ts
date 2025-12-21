import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminOrdersDetailsPageOrder } from '../selectors/getAdminOrdersDetailsPage';
import { fetchOrder } from './fetchOrder';

interface FetchOrderArgs {
    orderId: number;
}

export const fetchNewOrder = createAsyncThunk<
    void,
    FetchOrderArgs,
    ThunkConfig<any>
>(
    'pages/AdminOrdersDetailsPage/fetchNewOrder',
    async ({ orderId }, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const order = getAdminOrdersDetailsPageOrder(getState());

        if (order?.id !== orderId) {
            dispatch(fetchOrder({ orderId }));
        }
    },
);
