import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminOrdersPageSchema } from 'pages/AdminOrdersPage/model/types/AdminOrdersPageSchema';
import { Order } from 'entities/Order';
import { fetchOrders } from '../services/fetchOrders';

const initialState: AdminOrdersPageSchema = {
    isLoading: false,
    error: undefined,
    orders: [],
    _inited: false,
};

export const AdminOrdersPageSlice = createSlice({
    name: 'AdminOrdersPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.orders = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: AdminOrdersPageActions } = AdminOrdersPageSlice;
export const { reducer: AdminOrdersPageReducer } = AdminOrdersPageSlice;
