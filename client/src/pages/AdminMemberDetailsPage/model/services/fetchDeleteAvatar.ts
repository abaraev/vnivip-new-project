import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member } from 'entities/Member';
import { getAdminMemberDetailsPageMember } from '../selectors/getAdminMemberDetailsPage';

export const fetchDeleteAvatar = createAsyncThunk<
    Member,
    void,
    ThunkConfig<any>
>(
    'pages/AdminMemberDetailsPage/fetchDeleteAvatar',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const member = getAdminMemberDetailsPageMember(getState());

        try {
            const response = await extra.api.patch<Member>('/members/delete-avatar', {
                memberId: member?.id.toString(),
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
