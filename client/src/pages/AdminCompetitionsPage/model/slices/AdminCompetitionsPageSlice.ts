import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Competition } from 'entities/Competition';
import { Document } from 'entities/Document';
import {
    fetchOpenCompetition,
    FetchOpenCompetitionResult,
} from 'pages/AdminCompetitionsPage/model/services/fetchOpenCompetition';
import {
    fetchCloseCompetition,
    FetchCloseCompetitionResult,
} from '../services/fetchCloseCompetition';
import {
    fetchDeleteCompetition,
    FetchDeleteCompetitionResult,
} from '../services/fetchDeleteCompetition';
import { AdminCompetitionsPageSchema } from '../types/AdminCompetitionsPageSchema';
import { fetchAddCompetition } from '../services/fetchAddCompetition';
import { fetchCompetitions } from '../services/fetchCompetitions';
import { fetchAddDocument } from '../services/fetchAddDocument';
import { fetchDeleteDocument } from '../services/fetctDeleteDocument';

const initialState: AdminCompetitionsPageSchema = {
    isLoading: false,
    error: undefined,
    closedCompetitions: [],
    openedCompetitions: [],
    _inited: false,
    addingCompetitionName: '',
    addingCompetitionDescription: '',
    addingCompetitionDocuments: [],
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
                state.openedCompetitions = action.payload.filter((competition) => !competition.closed);
                state.closedCompetitions = action.payload.filter((competition) => competition.closed);
                state.isLoading = false;
            })
            .addCase(fetchCompetitions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchAddCompetition.fulfilled, (state, action: PayloadAction<Competition>) => {
                state.openedCompetitions = [action.payload, ...state.openedCompetitions];
                state.addingCompetitionName = '';
                state.addingCompetitionDescription = '';
                state.addingCompetitionDocuments = [];
            })
            .addCase(fetchDeleteCompetition.fulfilled, (state, action: PayloadAction<FetchDeleteCompetitionResult>) => {
                if (action.payload.competition.closed) {
                    state.closedCompetitions.splice(action.payload.competitionIndex, 1);
                } else {
                    state.openedCompetitions.splice(action.payload.competitionIndex, 1);
                }
            })
            .addCase(fetchAddDocument.fulfilled, (state, action: PayloadAction<Document>) => {
                state.addingCompetitionDocuments.push(action.payload);
            })
            .addCase(fetchDeleteDocument.fulfilled, (state, action: PayloadAction<Document>) => {
                const deleteIndex = state.addingCompetitionDocuments.findIndex((document) => document.id === action.payload.id);
                state.addingCompetitionDocuments.splice(deleteIndex, 1);
            })
            .addCase(fetchCloseCompetition.fulfilled, (state, action: PayloadAction<FetchCloseCompetitionResult>) => {
                const filteredArray = state.openedCompetitions.filter((competition) => competition.id !== action.payload.competition.id);
                state.openedCompetitions = filteredArray;
                state.closedCompetitions = [...state.closedCompetitions, action.payload.competition];
            })
            .addCase(fetchOpenCompetition.fulfilled, (state, action: PayloadAction<FetchOpenCompetitionResult>) => {
                const filteredArray = state.closedCompetitions.filter((competition) => competition.id !== action.payload.competition.id);
                state.closedCompetitions = filteredArray;
                state.openedCompetitions = [...state.openedCompetitions, action.payload.competition];
            });
    },
});

export const { actions: AdminCompetitionsPageActions } = AdminCompetitionsPageSlice;
export const { reducer: AdminCompetitionsPageReducer } = AdminCompetitionsPageSlice;
