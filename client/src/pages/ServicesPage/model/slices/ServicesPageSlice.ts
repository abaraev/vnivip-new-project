import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from 'entities/Service';
import { ServicesPageSchema } from '../types/ServicesPageSchema';
import { fetchServices } from '../services/fetchServices';

const initialState: ServicesPageSchema = {
    isLoading: false,
    error: undefined,
    services: [],
    _inited: false,
};

export const ServicesPageSlice = createSlice({
    name: 'ServicesPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
                state.services = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ServicesPageActions } = ServicesPageSlice;
export const { reducer: ServicesPageReducer } = ServicesPageSlice;
