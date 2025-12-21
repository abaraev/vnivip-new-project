import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from 'entities/Service';
import { Document } from 'entities/Document';
import { Order } from 'entities/Order';
import { fetchDeleteDocument } from 'pages/CartPage/model/services/fetctDeleteDocument';
import { sendOrder } from '../services/sendOrder';
import { CartPageSchema } from '../types/CartPageSchema';
import { fetchServicesByIds } from '../services/fetchServicesByIds';
import { fetchAddDocument } from '../services/fetchAddDocument';

const initialState: CartPageSchema = {
    isLoading: false,
    error: undefined,
    name: '',
    secondName: '',
    phone: '',
    email: '',
    comment: '',
    documents: [],
    validationErrors: [],
    orderSent: false,
    _orderNumber: undefined,
    _inited: false,
};

export const CartPageSlice = createSlice({
    name: 'CartPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setSecondName: (state, action: PayloadAction<string>) => {
            state.secondName = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setComment: (state, action: PayloadAction<string>) => {
            state.comment = action.payload;
        },
        orderSent: (state) => {
            state.orderSent = true;
        },
        clearDocuments: (state) => {
            state.documents = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServicesByIds.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchServicesByIds.fulfilled, (state, action: PayloadAction<Service[]>) => {
                state.services = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchServicesByIds.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(sendOrder.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(sendOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.orderSent = true;
                state._orderNumber = action.payload.id;
                state.validationErrors = [];
                state.isLoading = false;
            })
            .addCase(sendOrder.rejected, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.validationErrors = action.payload;
                    state.isLoading = false;
                    return;
                }
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchAddDocument.fulfilled, (state, action: PayloadAction<Document>) => {
                state.documents.push(action.payload);
            })
            .addCase(fetchDeleteDocument.fulfilled, (state, action: PayloadAction<Document>) => {
                const deleteIndex = state.documents.findIndex((document) => document.id === action.payload.id);
                state.documents.splice(deleteIndex, 1);
            });
    },
});

export const { actions: CartPageActions } = CartPageSlice;
export const { reducer: CartPageReducer } = CartPageSlice;
