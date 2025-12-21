import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

export interface FetchRefreshAuthReturnType {
    refreshToken: string;
    accessToken: string;
    admin: {
        id: number;
        login: string;
    }
}

export const fetchRefreshAuth = createAsyncThunk<
    FetchRefreshAuthReturnType,
    void,
    ThunkConfig<any>
>(
    'entities/Admin/fetchRefreshAuth',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue,
        } = thunkApi;

        try {
            const response = await extra.api.get<FetchRefreshAuthReturnType>('/auth/refresh');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
