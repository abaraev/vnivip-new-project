import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member, MemberSections } from 'entities/Member';

export const fetchAdministrationMembers = createAsyncThunk<
    Member[],
    void,
    ThunkConfig<any>
>(
    'pages/AdministrationPage/fetchContentCards',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Member[]>('/members/section', {
                params: {
                    section: MemberSections.ADMINISTRATION,
                },
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
