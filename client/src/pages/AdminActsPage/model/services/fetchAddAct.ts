import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Document } from 'entities/Document';

interface FetchAddActArgs {
    file: File;
}

export const fetchAddAct = createAsyncThunk<
    Document,
    FetchAddActArgs,
    ThunkConfig<any>
>(
    'pages/AdminActsPage/fetchAddAct',
    async ({ file }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        const formData = new FormData();
        formData.append('staticFile', file);

        try {
            const response = await extra.api.post<Document>(
                '/acts/content',
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
