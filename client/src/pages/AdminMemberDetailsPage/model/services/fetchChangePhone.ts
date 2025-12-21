import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member } from 'entities/Member';
import { getAdminMemberDetailsPageMember } from '../selectors/getAdminMemberDetailsPage';

interface FetchChangePhoneArgs {
    phone: string;
}

export const fetchChangePhone = createAsyncThunk<
    Member,
    FetchChangePhoneArgs,
    ThunkConfig<any>
>(
    'pages/AdminMemberDetailsPage/fetchChangePhone',
    async ({ phone }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const member = getAdminMemberDetailsPageMember(getState());

        try {
            const response = await extra.api.patch<Member>('/members/change-phone', {
                memberId: member?.id.toString(),
                phone,
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
