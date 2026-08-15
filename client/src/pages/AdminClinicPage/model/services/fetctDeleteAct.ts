import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Document } from 'entities/Document';

interface FetchDeleteActArgs {
    documentId: number;
}

export const fetchDeleteAct = createAsyncThunk<
    Document,
    FetchDeleteActArgs,
    ThunkConfig<any>
>(
    'pages/AdminClinicPage/fetchDeleteAct',
    async ({ documentId }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.delete<Document>(
                '/acts',
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
