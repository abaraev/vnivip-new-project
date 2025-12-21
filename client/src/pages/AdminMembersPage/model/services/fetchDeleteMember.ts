import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member, MemberSections } from 'entities/Member';

interface FetchDeleteMemberArgs {
    memberPosition: number;
    section: MemberSections;
}

export interface FetchDeleteMemberResult {
    section: MemberSections;
    members: Member[];
}

export const fetchDeleteMember = createAsyncThunk<
    FetchDeleteMemberResult,
    FetchDeleteMemberArgs,
    ThunkConfig<any>
>(
    'pages/AdminMemberDetailsPage/fetchDeleteMember',
    async ({
        memberPosition, section,
    }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.delete<Member[]>('/members', {
                params: {
                    section,
                    memberPosition,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return {
                members: response.data,
                section,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
