import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from 'entities/Service';
import { fetchDeleteCover } from '../services/fetchDeleteCover';
import {
    fetchChangeCover,
    FetchChangeCoverReturnData,
} from '../services/fetchChangeCover';
import { fetchService } from '../services/fetchService';
import { AdminServicesDetailsPageSchema } from '../types/AdminServicesDetailsPageSchema';

const initialState: AdminServicesDetailsPageSchema = {
    isLoading: false,
    error: undefined,
    _inited: false,
    service: undefined,
    price: '',
    name: '',
    coverImg: '',
};

export const AdminServicesDetailsPageSlice = createSlice({
    name: 'AdminServicesDetailsPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setPrice: (state, action: PayloadAction<string>) => {
            state.price = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchService.fulfilled, (state, action: PayloadAction<Service>) => {
                state.service = action.payload;
                state.price = action.payload.price.toString();
                state.name = action.payload.name;
                state.coverImg = action.payload.coverImg;
                state.isLoading = false;
            })
            .addCase(fetchService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchDeleteCover.fulfilled, (state, action) => {
                state.coverImg = '';
                if (state.service) {
                    state.service.coverImg = '';
                }
            })
            .addCase(fetchChangeCover.fulfilled, (state, action: PayloadAction<FetchChangeCoverReturnData>) => {
                state.coverImg = action.payload.fileName;
                if (state.service) {
                    state.service.coverImg = action.payload.fileName;
                }
            });
    },
});

export const { actions: AdminServicesDetailsPageActions } = AdminServicesDetailsPageSlice;
export const { reducer: AdminServicesDetailsPageReducer } = AdminServicesDetailsPageSlice;
