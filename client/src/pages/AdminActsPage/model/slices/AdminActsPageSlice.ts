import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document } from 'entities/Document';
import { AdminActsPageSchema } from 'pages/AdminActsPage';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchDeleteAct } from '../services/fetctDeleteAct';
import { fetchActs } from '../services/fetchActs';
import { fetchAddAct } from '../services/fetchAddAct';

const actsAdapter = createEntityAdapter<Document>({
    selectId: (act) => act.id,
});

export const getActs = actsAdapter.getSelectors<StateSchema>(
    (state) => state.adminActsPage || actsAdapter.getInitialState(),
);

export const AdminActsPageSlice = createSlice({
    name: 'AdminActsPageSlice',
    initialState: actsAdapter.getInitialState<AdminActsPageSchema>({
        ids: [],
        entities: {},
        isLoading: false,
        error: undefined,
        _inited: false,
    }),
    reducers: {
        init: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActs.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchActs.fulfilled, (state, action: PayloadAction<Document[]>) => {
                actsAdapter.addMany(state, action.payload);
                state.isLoading = false;
            })
            .addCase(fetchActs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchAddAct.fulfilled, (state, action: PayloadAction<Document>) => {
                const entity = action.payload;
                const newId = action.payload.id;
                state.ids = [newId, ...state.ids];
                state.entities[newId] = entity;
            })
            .addCase(fetchDeleteAct.fulfilled, (state, action: PayloadAction<Document>) => {
                actsAdapter.removeOne(state, action.payload.id);
            });
    },
});

export const { actions: AdminActsPageActions } = AdminActsPageSlice;
export const { reducer: AdminActsPageReducer } = AdminActsPageSlice;
