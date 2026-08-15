import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Document } from 'entities/Document';

export const fetchDocuments = createAsyncThunk<
    Document[],
    void,
    ThunkConfig<any>
>(
    'pages/ClinicPage/fetchDocuments',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Document[]>('/acts/clinic');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
