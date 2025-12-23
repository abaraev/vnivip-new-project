import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member } from 'entities/Member';
import { getAdminMemberDetailsPageMember } from '../selectors/getAdminMemberDetailsPage';

interface FetchChangeBioArgs {
    bio: string;
}

export const fetchChangeBio = createAsyncThunk<
    Member,
    FetchChangeBioArgs,
    ThunkConfig<any>
>(
    'pages/AdminMemberDetailsPage/fetchChangeBio',
    async ({ bio }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const member = getAdminMemberDetailsPageMember(getState());

        try {
            const response = await extra.api.patch<Member>('/members/change-bio', {
                memberId: member?.id.toString(),
                bio,
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
