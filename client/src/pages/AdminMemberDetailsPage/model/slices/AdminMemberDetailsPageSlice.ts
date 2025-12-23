import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from 'entities/Member';
import { fetchDeleteAvatar } from '../services/fetchDeleteAvatar';
import {
    fetchChangeAvatar,
    FetchChangeAvatarReturnData,
} from '../services/fetchChangeAvatar';
import { fetchMember } from '../services/fetchMember';
import { AdminMemberDetailsPageSchema } from '../types/AdminMemberDetailsPageSchema';

const initialState: AdminMemberDetailsPageSchema = {
    isLoading: false,
    error: undefined,
    _inited: false,
    member: undefined,
};

export const AdminMemberDetailsPageSlice = createSlice({
    name: 'AdminMemberDetailsPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setFullName: (state, action: PayloadAction<string>) => {
            if (state.member) {
                state.member.fullName = action.payload;
            }
        },
        setBio: (state, action: PayloadAction<string>) => {
            if (state.member) {
                state.member.bio = action.payload;
            }
        },
        setJobName: (state, action: PayloadAction<string>) => {
            if (state.member) {
                state.member.jobName = action.payload;
            }
        },
        setStatus: (state, action: PayloadAction<string>) => {
            if (state.member) {
                state.member.status = action.payload;
            }
        },
        setEmail: (state, action: PayloadAction<string>) => {
            if (state.member) {
                state.member.email = action.payload;
            }
        },
        setPhone: (state, action: PayloadAction<string>) => {
            if (state.member) {
                state.member.phone = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMember.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchMember.fulfilled, (state, action: PayloadAction<Member>) => {
                state.member = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchMember.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchDeleteAvatar.fulfilled, (state, action) => {
                if (state.member) {
                    state.member.avatar = '';
                }
            })
            .addCase(fetchChangeAvatar.fulfilled, (state, action: PayloadAction<FetchChangeAvatarReturnData>) => {
                if (state.member) {
                    state.member.avatar = action.payload.fileName;
                }
            });
    },
});

export const { actions: AdminMemberDetailsPageActions } = AdminMemberDetailsPageSlice;
export const { reducer: AdminMemberDetailsPageReducer } = AdminMemberDetailsPageSlice;
