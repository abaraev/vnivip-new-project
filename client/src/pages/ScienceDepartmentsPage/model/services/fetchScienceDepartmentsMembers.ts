import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member } from 'entities/Member';

export const fetchScienceDepartmentsMembers = createAsyncThunk<
    Member[],
    void,
    ThunkConfig<any>
>(
    'pages/ScienceDepartmentsPage/fetchScienceDepartmentsMembers',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Member[]>('/members/departments');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
