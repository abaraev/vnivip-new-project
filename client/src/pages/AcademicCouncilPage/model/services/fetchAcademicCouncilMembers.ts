import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member, MemberSections } from 'entities/Member';

export const fetchAcademicCouncilMembers = createAsyncThunk<
    Member[],
    void,
    ThunkConfig<any>
>(
    'pages/AcademicCouncilPage/fetchContentCards',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Member[]>('/members/section', {
                params: {
                    section: MemberSections.ACADEMIC_COUNCIL,
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
