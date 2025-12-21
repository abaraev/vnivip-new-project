import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member } from 'entities/Member';
import { getAdminMemberDetailsPageMember } from '../selectors/getAdminMemberDetailsPage';

interface FetchChangeFullNameArgs {
    fullName: string;
}

export const fetchChangeFullName = createAsyncThunk<
    Member,
    FetchChangeFullNameArgs,
    ThunkConfig<any>
>(
    'pages/AdminMemberDetailsPage/fetchChangeFullName',
    async ({ fullName }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const member = getAdminMemberDetailsPageMember(getState());

        try {
            const response = await extra.api.patch<Member>('/members/change-fullName', {
                memberId: member?.id.toString(),
                fullName,
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
