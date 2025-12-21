import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from 'entities/News';
import { StateSchema } from 'app/providers/StoreProvider';
import { Paragraph, ParagraphAlignText, ParagraphFirstElement } from 'entities/Paragraph';
import {
    fetchSwapContentParagraph,
    FetchSwapContentParagraphReturnData,
} from '../services/fetchSwapContentParagraph';
import {
    fetchDeleteParagraph,
    FetchDeleteParagraphReturnData,
} from '../services/fetchDeleteParagraph';
import {
    fetchMediaDeleteParagraph,
    FetchMediaDeleteParagraphReturnData,
} from '../services/fetchMediaDeleteParagraph';
import {
    fetchStaticUploadImage,
    FetchStaticUploadImageReturnData,
} from '../services/fetchStaticUploadImage';
import {
    fetchStaticUploadVideo,
    FetchStaticUploadVideoReturnData,
} from '../services/fetchStaticUploadVideo';
import { fetchAddParagraph } from '../services/fetchAddParagraph';
import { fetchDeleteStaticMedia } from '../services/fetchDeleteStaticMedia';
import { fetchDeleteCover } from '../services/fetchDeleteCover';
import { fetchChangeCover, FetchChangeCoverReturnData } from '../services/fetchChangeCover';
import {
    fetchSetAlignTextParagraph,
    FetchSetAlignTextParagraphReturnData,
} from '../services/fetchSetAlignTextParagraph';
import { fetchUploadImage, FetchUploadImageReturnData } from '../services/fetchUploadImage';
import { fetchUploadVideo, FetchUploadVideoReturnData } from '../services/fetchUploadVideo';
import { fetchUpPositionParagraph, FetchUpPositionParagraphReturnData } from '../services/fetchUpPositionParagraph';
import { fetchNews } from '../services/fetchNews';
import { AdminNewsDetailsPageSchema } from '../types/AdminNewsDetailsPageSchema';
import {
    fetchDownPositionParagraph,
    FetchDownPositionParagraphReturnData,
} from '../services/fetchDownPositionParagraph';

const paragraphsAdapter = createEntityAdapter<Paragraph>({
    selectId: (paragraph) => paragraph.position,
});

export const getParagraphs = paragraphsAdapter.getSelectors<StateSchema>(
    (state) => state.adminNewsDetailsPage || paragraphsAdapter.getInitialState(),
);

export const AdminNewsDetailsPageSlice = createSlice({
    name: 'AdminNewsDetailsPageSlice',
    initialState: paragraphsAdapter.getInitialState<AdminNewsDetailsPageSchema>({
        ids: [],
        entities: {},
        _inited: false,
        news: undefined,
        title: undefined,
        description: undefined,
        coverImg: undefined,
        error: undefined,
        isLoading: false,
        addingParagraphData: {
            video: undefined,
            videoPoster: undefined,
            img: undefined,
            text: '',
            firstElement: ParagraphFirstElement.TEXT,
            alignText: ParagraphAlignText.LEFT,
        },
        newsDay: undefined,
        newsMonth: undefined,
        newsYear: undefined,
        _isEditing: false,
    }),
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setNewsDay: (state, action: PayloadAction<string>) => {
            if (state.news) {
                state.news.timestamp = new Date(Number(state.news.timestamp) || state.news.createdAt).setDate(Number(action.payload));
            }

            state.newsDay = action.payload;
        },
        setNewsMonth: (state, action: PayloadAction<string>) => {
            if (state.news) {
                state.news.timestamp = new Date(Number(state.news.timestamp) || state.news.createdAt).setMonth(Number(action.payload) - 1);
            }

            state.newsMonth = action.payload;
        },
        setNewsYear: (state, action: PayloadAction<string>) => {
            if (state.news) {
                state.news.timestamp = new Date(Number(state.news.timestamp) || state.news.createdAt).setFullYear(Number(action.payload));
            }

            state.newsYear = action.payload;
        },
        setAddingParagraphAlignText: (state, action: PayloadAction<ParagraphAlignText>) => {
            state.addingParagraphData.alignText = action.payload;
        },
        setAddingParagraphText: (state, action: PayloadAction<string>) => {
            state.addingParagraphData.text = action.payload;
        },
        swapContentAddingParagraph: (state) => {
            if (state.addingParagraphData.firstElement === ParagraphFirstElement.TEXT) {
                state.addingParagraphData.firstElement = ParagraphFirstElement.MEDIA;
            } else if (state.addingParagraphData.firstElement === ParagraphFirstElement.MEDIA) {
                state.addingParagraphData.firstElement = ParagraphFirstElement.TEXT;
            }
        },
        setPublished: (state, action: PayloadAction<boolean>) => {
            state.published = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setTextAlignParagraphRight: (state, action: PayloadAction<number>) => {
            paragraphsAdapter.updateOne(
                state,
                {
                    id: action.payload,
                    changes: { alignText: ParagraphAlignText.RIGHT },
                },
            );
        },
        setTextAlignParagraphCenter: (state, action: PayloadAction<number>) => {
            paragraphsAdapter.updateOne(
                state,
                {
                    id: action.payload,
                    changes: { alignText: ParagraphAlignText.CENTER },
                },
            );
        },
        setTextAlignParagraphJustify: (state, action: PayloadAction<number>) => {
            paragraphsAdapter.updateOne(
                state,
                {
                    id: action.payload,
                    changes: { alignText: ParagraphAlignText.JUSTIFY },
                },
            );
        },
        setParagraphText: (state, action: PayloadAction<{paragraphPosition: number, text: string}>) => {
            paragraphsAdapter.updateOne(
                state,
                {
                    id: action.payload.paragraphPosition,
                    changes: { text: action.payload.text },
                },
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News>) => {
                paragraphsAdapter.addMany(state, action.payload.paragraphs);
                state.title = action.payload.title;
                state.published = action.payload.published;
                state.description = action.payload.description;
                state.coverImg = action.payload.coverImg;
                state.news = action.payload;
                state.isLoading = false;

                let date;
                if (action.payload.timestamp) {
                    date = new Date(Number(action.payload.timestamp))
                        .toLocaleDateString()
                        .split('.');
                } else {
                    date = new Date(action.payload.createdAt)
                        .toLocaleDateString()
                        .split('.');
                }

                const day = Number(date[0]).toString();

                state.newsDay = day;
                state.newsMonth = date[1];
                state.newsYear = date[2];
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchUploadImage.fulfilled, (state, action: PayloadAction<FetchUploadImageReturnData>) => {
                paragraphsAdapter.updateOne(
                    state,
                    {
                        id: action.payload.paragraphPosition,
                        changes: { img: action.payload.fileName },
                    },
                );
            })
            .addCase(fetchUploadVideo.fulfilled, (state, action: PayloadAction<FetchUploadVideoReturnData>) => {
                paragraphsAdapter.updateOne(
                    state,
                    {
                        id: action.payload.paragraphPosition,
                        changes: {
                            video: action.payload.videoFileName,
                            videoPoster: action.payload.posterFileName,
                        },
                    },
                );
            })
            .addCase(fetchUpPositionParagraph.fulfilled, (state, action: PayloadAction<FetchUpPositionParagraphReturnData>) => {
                const currentParagraph = state.entities[action.payload.paragraphPosition.toString()];
                const replaceableParagraph = state.entities[(action.payload.paragraphPosition - 1).toString()];

                if (currentParagraph && replaceableParagraph && currentParagraph.position > 0) {
                    currentParagraph.position -= 1;
                    replaceableParagraph.position += 1;

                    paragraphsAdapter.upsertOne(state, currentParagraph);
                    paragraphsAdapter.upsertOne(state, replaceableParagraph);
                }
            })
            .addCase(fetchDownPositionParagraph.fulfilled, (state, action: PayloadAction<FetchDownPositionParagraphReturnData>) => {
                const currentParagraph = state.entities[action.payload.paragraphPosition.toString()];
                const replaceableParagraph = state.entities[(action.payload.paragraphPosition + 1).toString()];

                if (currentParagraph && replaceableParagraph && currentParagraph.position < state.ids.length - 1) {
                    currentParagraph.position += 1;
                    replaceableParagraph.position -= 1;

                    paragraphsAdapter.upsertOne(state, currentParagraph);
                    paragraphsAdapter.upsertOne(state, replaceableParagraph);
                }
            })
            .addCase(fetchSetAlignTextParagraph.fulfilled, (state, action: PayloadAction<FetchSetAlignTextParagraphReturnData>) => {
                paragraphsAdapter.updateOne(
                    state,
                    {
                        id: action.payload.paragraphPosition,
                        changes: { alignText: action.payload.alignText },
                    },
                );
            })
            .addCase(fetchSwapContentParagraph.fulfilled, (state, action: PayloadAction<FetchSwapContentParagraphReturnData>) => {
                const currentParagraph = state.entities[action.payload.paragraphPosition.toString()];

                if (!currentParagraph) return;

                if (currentParagraph?.firstElement === ParagraphFirstElement.TEXT) {
                    currentParagraph.firstElement = ParagraphFirstElement.MEDIA;
                } else if (currentParagraph?.firstElement === ParagraphFirstElement.MEDIA) {
                    currentParagraph.firstElement = ParagraphFirstElement.TEXT;
                }

                paragraphsAdapter.upsertOne(state, currentParagraph);
            })
            .addCase(fetchDeleteParagraph.fulfilled, (state, action: PayloadAction<FetchDeleteParagraphReturnData>) => {
                paragraphsAdapter.removeAll(state);
                if (action.payload.paragraphs.length) {
                    paragraphsAdapter.addMany(state, action.payload.paragraphs);
                } else {
                    state.published = false;
                }
            })
            .addCase(fetchMediaDeleteParagraph.fulfilled, (state, action: PayloadAction<FetchMediaDeleteParagraphReturnData>) => {
                paragraphsAdapter.updateOne(
                    state,
                    {
                        id: action.payload.paragraphPosition,
                        changes: {
                            video: null,
                            videoPoster: null,
                            img: null,
                        },
                    },
                );
            })
            .addCase(fetchStaticUploadImage.fulfilled, (state, action: PayloadAction<FetchStaticUploadImageReturnData>) => {
                state.addingParagraphData.img = action.payload.fileName;
            })
            .addCase(fetchStaticUploadVideo.fulfilled, (state, action: PayloadAction<FetchStaticUploadVideoReturnData>) => {
                state.addingParagraphData.video = action.payload.videoFileName;
                state.addingParagraphData.videoPoster = action.payload.posterFileName;
            })
            .addCase(fetchAddParagraph.fulfilled, (state, action: PayloadAction<Paragraph>) => {
                state.addingParagraphData.video = undefined;
                state.addingParagraphData.videoPoster = undefined;
                state.addingParagraphData.img = undefined;
                state.addingParagraphData.text = '';
                state.addingParagraphData.alignText = ParagraphAlignText.LEFT;
                state.addingParagraphData.firstElement = ParagraphFirstElement.TEXT;

                paragraphsAdapter.addOne(state, action.payload);
            })
            .addCase(fetchDeleteStaticMedia.fulfilled, (state) => {
                state.addingParagraphData.img = undefined;
                state.addingParagraphData.video = undefined;
                state.addingParagraphData.videoPoster = undefined;
            })
            .addCase(fetchDeleteCover.fulfilled, (state) => {
                state.coverImg = undefined;
            })
            .addCase(fetchChangeCover.fulfilled, (state, action: PayloadAction<FetchChangeCoverReturnData>) => {
                state.coverImg = action.payload.fileName;
            });
    },
});

export const { actions: AdminNewsDetailsPageActions } = AdminNewsDetailsPageSlice;
export const { reducer: AdminNewsDetailsPageReducer } = AdminNewsDetailsPageSlice;
