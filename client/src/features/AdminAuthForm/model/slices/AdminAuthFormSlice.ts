import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, FetchLoginReturnType } from 'features/AdminAuthForm';
import { AdminAuthFormSchema } from '../types/AdminAuthFormSchema';

const initialState: AdminAuthFormSchema = {
    isLoading: false,
    error: undefined,
    login: '',
    password: '',
};

export const AdminAuthFormSlice = createSlice({
    name: 'AdminAuthFormSlice',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<FetchLoginReturnType>) => {
                state.isLoading = false;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                if (action.payload?.response?.status === 400) {
                    state.error = 'Неверный логин или пароль';
                    state.isLoading = false;
                } else {
                    state.error = 'Что-то пошло не так, скорее всего проблема на сервере';
                    state.isLoading = false;
                }
            });
    },
});

export const { actions: AdminAuthFormActions } = AdminAuthFormSlice;
export const { reducer: AdminAuthFormReducer } = AdminAuthFormSlice;
