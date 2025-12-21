import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member } from 'entities/Member';
import {
    getAdminMembersPageAddingMemberFullName,
    getAdminMembersPageAddingMemberSection,
} from '../selectors/getAdminMembersPage';

export const fetchAddMember = createAsyncThunk<
    Member,
    void,
    ThunkConfig<any>
>(
    'pages/AdminMembersPage/fetchAddMember',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const fullName = getAdminMembersPageAddingMemberFullName(getState());
        const section = getAdminMembersPageAddingMemberSection(getState());

        try {
            const response = await extra.api.post<Member>('/members', {
                fullName,
                section,
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
