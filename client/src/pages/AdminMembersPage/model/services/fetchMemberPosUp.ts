import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member, MemberSections } from 'entities/Member';

interface FetchMemberPosUpArgs {
    memberPosition: number;
    memberIndex: number;
    section: MemberSections;
}

export interface FetchMemberPosUpResult {
    member: Member;
    memberIndex: number;
    section: MemberSections;
}

export const fetchMemberPosUp = createAsyncThunk<
    FetchMemberPosUpResult,
    FetchMemberPosUpArgs,
    ThunkConfig<any>
>(
    'pages/AdminMembersPage/fetchMemberPosUp',
    async ({ memberPosition, memberIndex, section }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.patch<Member>('/members/position-up', {
                memberPosition: memberPosition.toString(),
                section,
            });

            if (!response.data) {
                throw new Error();
            }

            return {
                member: response.data,
                memberIndex,
                section,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
