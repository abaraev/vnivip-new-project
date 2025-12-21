import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from 'entities/News';
import { StateSchema } from 'app/providers/StoreProvider';
import { NewsPageSchema } from 'pages/NewsPage';
import { fetchAddNews } from 'pages/AdminNewsPage/model/services/fetchAddNews';
import { fetchNews } from '../services/fetchNews';
import { AdminNewsPageSchema } from '../types/AdminNewsPageSchema';

const newsAdapter = createEntityAdapter<News>({
    selectId: (news) => news.id,
});

export const getNews = newsAdapter.getSelectors<StateSchema>(
    (state) => state.adminNewsPage || newsAdapter.getInitialState(),
);

export const AdminNewsPageSlice = createSlice({
    name: 'AdminNewsPageSlice',
    initialState: newsAdapter.getInitialState<NewsPageSchema>({
        listIsLoading: false,
        mainNewsIsLoading: false,
        listError: undefined,
        mainNewsError: undefined,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
        search: '',
        limit: 8,
        order: 'DESC',
        _inited: false,
    }),
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.listIsLoading = true;
            newsAdapter.removeAll(state);
            state.page = 1;
            state.search = action.payload;
        },
        setListIsLoading: (state, action: PayloadAction<boolean>) => {
            state.listIsLoading = action.payload;
        },
        init: (state) => {
            state._inited = true;
        },
        setOrder: (state, action: PayloadAction<'ASC' | 'DESC'>) => {
            state.listIsLoading = true;
            newsAdapter.removeAll(state);
            state.page = 1;
            state.order = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.listError = undefined;
                state.listIsLoading = true;
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
                newsAdapter.addMany(state, action.payload);
                state.hasMore = action.payload.length >= state.limit;
                state.page += 1;
                state.listIsLoading = false;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.listIsLoading = false;
                state.listError = action.payload;
            })
            .addCase(fetchAddNews.fulfilled, (state, action: PayloadAction<News>) => {
                const entity = action.payload;
                const newId = action.payload.id;
                state.ids = [newId, ...state.ids];
                state.entities[newId] = entity;
            });
    },
});

export const { actions: AdminNewsPageActions } = AdminNewsPageSlice;
export const { reducer: AdminNewsPageReducer } = AdminNewsPageSlice;
