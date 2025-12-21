import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminMemberDetailsPageMember } from '../selectors/getAdminMemberDetailsPage';

interface FetchChangeAvatarArgs {
    file: File;
}

export interface FetchChangeAvatarReturnData {
    fileName: string;
}

export const fetchChangeAvatar = createAsyncThunk<
    FetchChangeAvatarReturnData,
    FetchChangeAvatarArgs,
    ThunkConfig<any>
>(
    'pages/AdminMemberDetailsPage/fetchChangeAvatar',
    async ({ file }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const member = getAdminMemberDetailsPageMember(getState());

        if (!member?.id) {
            throw new Error();
        }

        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('memberId', member.id.toString());

        try {
            const response = await extra.api.patch<FetchChangeAvatarReturnData>(
                '/members/change-avatar',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
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
