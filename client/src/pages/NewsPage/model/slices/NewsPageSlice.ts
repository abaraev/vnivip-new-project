import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from 'entities/News';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchMainNews } from '../services/fetchMainNews';
import { NewsPageSchema } from '../types/NewsPageSchema';
import { fetchNews } from '../services/fetchNews';

const newsAdapter = createEntityAdapter<News>({
    selectId: (news) => news.id,
});

export const getNews = newsAdapter.getSelectors<StateSchema>(
    (state) => state.newsPage || newsAdapter.getInitialState(),
);

export const NewsPageSlice = createSlice({
    name: 'NewsPageSlice',
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
            // Главная новость
            .addCase(fetchMainNews.pending, (state) => {
                state.mainNewsError = undefined;
                state.mainNewsIsLoading = true;
            })
            .addCase(fetchMainNews.fulfilled, (state, action: PayloadAction<News>) => {
                state.mainNews = action.payload;
                state.mainNewsIsLoading = false;
            })
            .addCase(fetchMainNews.rejected, (state, action) => {
                state.mainNewsIsLoading = false;
                state.mainNewsError = action.payload;
            });
    },
});

export const { actions: NewsPageActions } = NewsPageSlice;
export const { reducer: NewsPageReducer } = NewsPageSlice;
