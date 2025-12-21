import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CART_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { CartSchema, CartService } from '../types/CartSchema';

const initialState: CartSchema = {
    services: [],
};

export const CartSlice = createSlice({
    name: 'CartSlice',
    initialState,
    reducers: {
        updateCart: (state) => {
            state.services = JSON.parse(localStorage.getItem(CART_LOCALSTORAGE_KEY) || '[]') as CartService[];
        },
        addService: (state, action: PayloadAction<number>) => {
            const currentService = state.services.find((service) => service.id === action.payload);

            if (!currentService) {
                const newService = {
                    id: action.payload,
                    amount: 1,
                };
                const updatedServices = [...state.services, newService];
                state.services = updatedServices;
                localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(updatedServices));
                return;
            }

            const updatedServices = state.services.map((service) => {
                if (service.id === action.payload) {
                    return {
                        id: service.id,
                        amount: service.amount + 1,
                    };
                }

                return service;
            });
            state.services = updatedServices;
            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(updatedServices));
        },
        removeService: (state, action: PayloadAction<number>) => {
            const currentService = state.services.find((service) => service.id === action.payload);
            if (!currentService) {
                return;
            }

            const updatedServices = state.services.map((service) => {
                if (service.id === currentService.id) {
                    return {
                        id: service.id,
                        amount: service.amount - 1,
                    };
                }

                return service;
            });
            state.services = updatedServices;
            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(updatedServices));
        },
        deleteService: (state, action: PayloadAction<number>) => {
            const currentService = state.services.find((service) => service.id === action.payload);
            if (!currentService) {
                return;
            }

            const updatedServices = state.services.filter((service) => service.id !== currentService.id);
            state.services = updatedServices;
            localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(updatedServices));
        },
        clearCart: (state) => {
            state.services = [];
            localStorage.setItem(CART_LOCALSTORAGE_KEY, '[]');
        },
    },
});

export const { actions: CartSliceActions } = CartSlice;
export const { reducer: CartSliceReducer } = CartSlice;
