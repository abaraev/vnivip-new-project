import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRefreshAuth } from 'entities/Admin';
import { FetchRefreshAuthReturnType } from 'entities/Admin/model/services/fetchRefreshAuth';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { AdminData, AdminSchema } from '../types/Admin';

const initialState: AdminSchema = {
    data: undefined,
    isInit: false,
};

export const AdminSlice = createSlice({
    name: 'AdminSlice',
    initialState,
    reducers: {
        setAdminData: (state, action: PayloadAction<AdminData>) => {
            state.data = action.payload;
        },
        initAdmin: (state) => {
            state.isInit = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRefreshAuth.pending, (state) => {

            })
            .addCase(fetchRefreshAuth.fulfilled, (state, action: PayloadAction<FetchRefreshAuthReturnType>) => {
                state.data = action.payload?.admin;
                localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, action.payload?.accessToken);
                state.isInit = true;
            })
            .addCase(fetchRefreshAuth.rejected, (state, action) => {
                state.data = undefined;
                localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, '');
                state.isInit = true;
            });
    },
});

export const { actions: AdminSliceActions } = AdminSlice;
export const { reducer: AdminSliceReducer } = AdminSlice;
