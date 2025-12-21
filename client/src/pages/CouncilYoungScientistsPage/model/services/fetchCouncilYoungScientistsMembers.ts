import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Member, MemberSections } from 'entities/Member';

export const fetchCouncilYoungScientistsMembers = createAsyncThunk<
    Member[],
    void,
    ThunkConfig<any>
>(
    'pages/CouncilYoungScientistsPage/fetchScienceDepartmentsMembers',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Member[]>('/members/section', {
                params: {
                    section: MemberSections.COUNCIL_OF_YOUNG_SCIENTISTS,
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
