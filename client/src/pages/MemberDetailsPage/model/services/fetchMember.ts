import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member } from 'entities/Member';

interface FetchMemberArgs {
    memberId: string;
}

export const fetchMember = createAsyncThunk<
    Member,
    FetchMemberArgs,
    ThunkConfig<any>
>(
    'pages/MemberDetailsPage/fetchMember',
    async ({ memberId }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Member>('/members/one', {
                params: {
                    memberId,
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
