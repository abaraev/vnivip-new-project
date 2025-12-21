import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AdminSliceActions } from 'entities/Admin';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { getAdminAuthFormLogin, getAdminAuthFormPassword } from '../selectors/getAdminAuthForm';

export interface FetchLoginReturnType {
    refreshToken: string;
    accessToken: string;
    admin: {
        id: number;
        login: string;
    }
}

export const fetchLogin = createAsyncThunk<
    FetchLoginReturnType,
    void,
    ThunkConfig<any>
>(
    'features/AdminAuthForm/fetchLogin',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const login = getAdminAuthFormLogin(getState());
        const password = getAdminAuthFormPassword(getState());

        try {
            const response = await extra.api.post<FetchLoginReturnType>('/auth/login', {
                login,
                password,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(AdminSliceActions.setAdminData(response.data.admin));
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.data.accessToken);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
