import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCard, ContentCardPages } from 'entities/ContentCard';

export const fetchContentCards = createAsyncThunk<
    ContentCard[],
    void,
    ThunkConfig<any>
>(
    'pages/EngineeringPage/fetchContentCards',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<ContentCard[]>('/content-cards/page', {
                params: {
                    page: ContentCardPages.ENGINEERING,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
