import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member, MemberSections } from 'entities/Member';

interface FetchMemberPosDownArgs {
    memberPosition: number;
    memberIndex: number;
    section: MemberSections;
}

export interface FetchMemberPosDownResult {
    member: Member;
    memberIndex: number;
    section: MemberSections;
}

export const fetchMemberPosDown = createAsyncThunk<
    FetchMemberPosDownResult,
    FetchMemberPosDownArgs,
    ThunkConfig<any>
>(
    'pages/AdminMembersPage/fetchMemberPosDown',
    async ({ memberPosition, memberIndex, section }, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.patch<Member>('/members/position-down', {
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
