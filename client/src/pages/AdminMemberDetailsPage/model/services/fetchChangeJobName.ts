import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member } from 'entities/Member';
import { getAdminMemberDetailsPageMember } from '../selectors/getAdminMemberDetailsPage';

interface FetchChangeJobNameArgs {
    jobName: string;
}

export const fetchChangeJobName = createAsyncThunk<
    Member,
    FetchChangeJobNameArgs,
    ThunkConfig<any>
>(
    'pages/AdminMemberDetailsPage/fetchChangeJobName',
    async ({ jobName }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const member = getAdminMemberDetailsPageMember(getState());

        try {
            const response = await extra.api.patch<Member>('/members/change-jobName', {
                memberId: member?.id.toString(),
                jobName,
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
