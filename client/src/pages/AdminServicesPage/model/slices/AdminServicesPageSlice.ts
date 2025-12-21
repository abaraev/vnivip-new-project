import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from 'entities/Service';
import { AdminServicesPageSchema } from '../types/AdminServicesPageSchema';
import { fetchAddService } from '../services/fetchAddService';
import { fetchServices } from '../services/fetchServices';

const initialState: AdminServicesPageSchema = {
    isLoading: false,
    error: undefined,
    services: [],
    _inited: false,
    addingServiceName: '',
    addingServicePrice: '',
};

export const AdminServicesPageSlice = createSlice({
    name: 'AdminServicesPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setAddingServiceName: (state, action: PayloadAction<string>) => {
            state.addingServiceName = action.payload;
        },
        setAddingServicePrice: (state, action: PayloadAction<string>) => {
            state.addingServicePrice = action.payload;
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
            })
            .addCase(fetchAddService.fulfilled, (state, action: PayloadAction<Service>) => {
                state.services = [action.payload, ...state.services];
                state.addingServiceName = '';
                state.addingServicePrice = '';
            });
    },
});

export const { actions: AdminServicesPageActions } = AdminServicesPageSlice;
export const { reducer: AdminServicesPageReducer } = AdminServicesPageSlice;
