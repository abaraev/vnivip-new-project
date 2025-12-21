import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member } from 'entities/Member';
import { getAdminMemberDetailsPageMember } from '../selectors/getAdminMemberDetailsPage';

interface FetchChangeStatusArgs {
    status: string;
}

export const fetchChangeStatus = createAsyncThunk<
    Member,
    FetchChangeStatusArgs,
    ThunkConfig<any>
>(
    'pages/AdminMemberDetailsPage/fetchChangeStatus',
    async ({ status }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const member = getAdminMemberDetailsPageMember(getState());

        try {
            const response = await extra.api.patch<Member>('/members/change-status', {
                memberId: member?.id.toString(),
                status,
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
