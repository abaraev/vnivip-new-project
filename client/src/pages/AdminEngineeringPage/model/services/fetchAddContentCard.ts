import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ContentCard, ContentCardPages } from 'entities/ContentCard';
import {
    getAdminEngineeringPageAddingContentCardData,
} from '../selectors/getAdminEngineeringPage';

export const fetchAddContentCard = createAsyncThunk<
    ContentCard,
    void,
    ThunkConfig<any>
>(
    'pages/AdminEngineeringPage/fetchAddContentCard',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const data = getAdminEngineeringPageAddingContentCardData(getState());

        try {
            const response = await extra.api.post<ContentCard>(
                '/content-cards/add',
                {
                    ...data,
                    page: ContentCardPages.ENGINEERING,
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
