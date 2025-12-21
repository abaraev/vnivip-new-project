import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Document } from 'entities/Document';

interface FetchAddDocumentArgs {
    file: File;
}

export const fetchAddDocument = createAsyncThunk<
    Document,
    FetchAddDocumentArgs,
    ThunkConfig<any>
>(
    'pages/CartPage/fetchAddDocument',
    async ({ file }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const formData = new FormData();
        formData.append('staticFile', file);

        try {
            const response = await extra.api.post<Document>(
                '/acts/order',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
