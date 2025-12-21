import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Document } from 'entities/Document';

interface FetchDeleteDocumentArgs {
    documentId: number;
}

export const fetchDeleteDocument = createAsyncThunk<
    Document,
    FetchDeleteDocumentArgs,
    ThunkConfig<any>
>(
    'pages/CartPage/fetchDeleteDocument',
    async ({ documentId }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.delete<Document>(
                '/acts/order',
                {
                    params: {
                        actId: Number(documentId),
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
