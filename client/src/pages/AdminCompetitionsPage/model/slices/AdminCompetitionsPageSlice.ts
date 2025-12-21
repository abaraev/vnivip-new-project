import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Competition } from 'entities/Competition';
import {
    fetchDeleteCompetition,
    FetchDeleteCompetitionResult,
} from 'pages/AdminCompetitionsPage/model/services/fetchDeleteCompetition';
import { AdminCompetitionsPageSchema } from '../types/AdminCompetitionsPageSchema';
import { fetchAddCompetition } from '../services/fetchAddCompetition';
import { fetchCompetitions } from '../services/fetchCompetitions';

const initialState: AdminCompetitionsPageSchema = {
    isLoading: false,
    error: undefined,
    competitions: [],
    _inited: false,
    addingCompetitionName: '',
    addingCompetitionDescription: '',
};

export const AdminCompetitionsPageSlice = createSlice({
    name: 'AdminCompetitionsPageSlice',
    initialState,
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setAddingCompetitionName: (state, action: PayloadAction<string>) => {
            state.addingCompetitionName = action.payload;
        },
        setAddingCompetitionDescription: (state, action: PayloadAction<string>) => {
            state.addingCompetitionDescription = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompetitions.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCompetitions.fulfilled, (state, action: PayloadAction<Competition[]>) => {
                state.competitions = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCompetitions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchAddCompetition.fulfilled, (state, action: PayloadAction<Competition>) => {
                state.competitions = [action.payload, ...state.competitions];
                state.addingCompetitionName = '';
                state.addingCompetitionDescription = '';
            })
            .addCase(fetchDeleteCompetition.fulfilled, (state, action: PayloadAction<FetchDeleteCompetitionResult>) => {
                state.competitions.splice(action.payload.competitionIndex, 1);
            });
    },
});

export const { actions: AdminCompetitionsPageActions } = AdminCompetitionsPageSlice;
export const { reducer: AdminCompetitionsPageReducer } = AdminCompetitionsPageSlice;
