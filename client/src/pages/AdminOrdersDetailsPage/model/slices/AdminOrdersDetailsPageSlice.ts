import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus } from 'entities/Order';
import { fetchSetStatus } from 'pages/AdminOrdersDetailsPage/model/services/fetchSetStatus';
import { fetchOrder } from '../services/fetchOrder';
import { AdminOrdersDetailsPageSchema } from '../types/AdminOrdersDetailsPageSchema';

const initialState: AdminOrdersDetailsPageSchema = {
    isLoading: false,
    error: undefined,
    _inited: false,
    isChanged: false,
};

export const AdminOrdersDetailsPageSlice = createSlice({
    name: 'AdminOrdersDetailsPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setStatus: (state, action: PayloadAction<OrderStatus>) => {
            state.orderStatus = action.payload;
            state.isChanged = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.isLoading = true;
                state.order = undefined;
                state.error = undefined;
            })
            .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.order = action.payload;
                state.orderStatus = action.payload.status;
                state.isLoading = false;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchSetStatus.pending, (state) => {

            })
            .addCase(fetchSetStatus.fulfilled, (state, action: PayloadAction<Order>) => {
                state.order = action.payload;
                state.isChanged = false;
            })
            .addCase(fetchSetStatus.rejected, (state, action) => {

            });
    },
});

export const { actions: AdminOrdersDetailsPageActions } = AdminOrdersDetailsPageSlice;
export const { reducer: AdminOrdersDetailsPageReducer } = AdminOrdersDetailsPageSlice;
