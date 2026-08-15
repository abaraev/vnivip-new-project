import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ContentCard, ContentCardAlignText, ContentCardFirstElement } from 'entities/ContentCard';
import { fetchContentCards } from '../services/fetchContentCards';
import {
    fetchSwapContentContentCard,
    FetchSwapContentContentCardReturnData,
} from '../services/fetchSwapContentContentCard';
import { fetchDeleteContentCard, FetchDeleteContentCardReturnData } from '../services/fetchDeleteContentCard';
import {
    fetchMediaDeleteContentCard,
    FetchMediaDeleteContentCardReturnData,
} from '../services/fetchMediaDeleteContentCard';
import { fetchStaticUploadImage, FetchStaticUploadImageReturnData } from '../services/fetchStaticUploadImage';
import { fetchStaticUploadVideo, FetchStaticUploadVideoReturnData } from '../services/fetchStaticUploadVideo';
import { fetchAddContentCard } from '../services/fetchAddContentCard';
import { fetchDeleteStaticMedia } from '../services/fetchDeleteStaticMedia';
import {
    fetchSetAlignTextContentCard,
    FetchSetAlignTextContentCardReturnData,
} from '../services/fetchSetAlignTextContentCard';
import { fetchUploadImage, FetchUploadImageReturnData } from '../services/fetchUploadImage';
import { fetchUploadVideo, FetchUploadVideoReturnData } from '../services/fetchUploadVideo';
import { fetchUpPositionContentCard, FetchUpPositionContentCardReturnData } from '../services/fetchUpPositionContentCard';
import { AdminEngineeringPageSchema } from '../types/AdminEngineeringPageSchema';
import {
    fetchDownPositionContentCard,
    FetchDownPositionContentCardReturnData,
} from '../services/fetchDownPositionContentCard';

const ContentCardsAdapter = createEntityAdapter<ContentCard>({
    selectId: (contentCard) => contentCard.position,
});

export const getContentCards = ContentCardsAdapter.getSelectors<StateSchema>(
    (state) => state.adminEngineeringPage || ContentCardsAdapter.getInitialState(),
);

export const AdminEngineeringPageSlice = createSlice({
    name: 'AdminEngineeringPageSlice',
    initialState: ContentCardsAdapter.getInitialState<AdminEngineeringPageSchema>({
        ids: [],
        entities: {},
        _inited: false,
        error: undefined,
        isLoading: false,
        addingContentCardData: {
            video: undefined,
            videoPoster: undefined,
            img: undefined,
            text: '',
            firstElement: ContentCardFirstElement.TEXT,
            alignText: ContentCardAlignText.LEFT,
        },
        _isEditing: false,
    }),
    reducers: {
        init: (state) => {
            state._inited = true;
        },
        setAddingContentCardAlignText: (state, action: PayloadAction<ContentCardAlignText>) => {
            state.addingContentCardData.alignText = action.payload;
        },
        setAddingContentCardText: (state, action: PayloadAction<string>) => {
            state.addingContentCardData.text = action.payload;
        },
        swapContentAddingContentCard: (state) => {
            if (state.addingContentCardData.firstElement === ContentCardFirstElement.TEXT) {
                state.addingContentCardData.firstElement = ContentCardFirstElement.MEDIA;
            } else if (state.addingContentCardData.firstElement === ContentCardFirstElement.MEDIA) {
                state.addingContentCardData.firstElement = ContentCardFirstElement.TEXT;
            }
        },
        setTextAlignContentCardRight: (state, action: PayloadAction<number>) => {
            ContentCardsAdapter.updateOne(
                state,
                {
                    id: action.payload,
                    changes: { alignText: ContentCardAlignText.RIGHT },
                },
            );
        },
        setTextAlignContentCardCenter: (state, action: PayloadAction<number>) => {
            ContentCardsAdapter.updateOne(
                state,
                {
                    id: action.payload,
                    changes: { alignText: ContentCardAlignText.CENTER },
                },
            );
        },
        setTextAlignContentCardJustify: (state, action: PayloadAction<number>) => {
            ContentCardsAdapter.updateOne(
                state,
                {
                    id: action.payload,
                    changes: { alignText: ContentCardAlignText.JUSTIFY },
                },
            );
        },
        setContentCardText: (state, action: PayloadAction<{contentCardPosition: number, text: string}>) => {
            ContentCardsAdapter.updateOne(
                state,
                {
                    id: action.payload.contentCardPosition,
                    changes: { text: action.payload.text },
                },
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContentCards.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchContentCards.fulfilled, (state, action: PayloadAction<ContentCard[]>) => {
                ContentCardsAdapter.addMany(state, action.payload);
                state.isLoading = false;
            })
            .addCase(fetchContentCards.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchUploadImage.fulfilled, (state, action: PayloadAction<FetchUploadImageReturnData>) => {
                ContentCardsAdapter.updateOne(
                    state,
                    {
                        id: action.payload.contentCardPosition,
                        changes: { img: action.payload.fileName },
                    },
                );
            })
            .addCase(fetchUploadVideo.fulfilled, (state, action: PayloadAction<FetchUploadVideoReturnData>) => {
                ContentCardsAdapter.updateOne(
                    state,
                    {
                        id: action.payload.contentCardPosition,
                        changes: {
                            video: action.payload.videoFileName,
                            videoPoster: action.payload.posterFileName,
                        },
                    },
                );
            })
            .addCase(fetchUpPositionContentCard.fulfilled, (state, action: PayloadAction<FetchUpPositionContentCardReturnData>) => {
                const currentContentCard = state.entities[action.payload.contentCardPosition.toString()];
                const replaceableContentCard = state.entities[(action.payload.contentCardPosition - 1).toString()];

                if (currentContentCard && replaceableContentCard && currentContentCard.position > 0) {
                    currentContentCard.position -= 1;
                    replaceableContentCard.position += 1;

                    ContentCardsAdapter.upsertOne(state, currentContentCard);
                    ContentCardsAdapter.upsertOne(state, replaceableContentCard);
                }
            })
            .addCase(fetchDownPositionContentCard.fulfilled, (state, action: PayloadAction<FetchDownPositionContentCardReturnData>) => {
                const currentContentCard = state.entities[action.payload.contentCardPosition.toString()];
                const replaceableContentCard = state.entities[(action.payload.contentCardPosition + 1).toString()];

                if (currentContentCard && replaceableContentCard && currentContentCard.position < state.ids.length - 1) {
                    currentContentCard.position += 1;
                    replaceableContentCard.position -= 1;

                    ContentCardsAdapter.upsertOne(state, currentContentCard);
                    ContentCardsAdapter.upsertOne(state, replaceableContentCard);
                }
            })
            .addCase(fetchSetAlignTextContentCard.fulfilled, (state, action: PayloadAction<FetchSetAlignTextContentCardReturnData>) => {
                ContentCardsAdapter.updateOne(
                    state,
                    {
                        id: action.payload.contentCardPosition,
                        changes: { alignText: action.payload.alignText },
                    },
                );
            })
            .addCase(fetchSwapContentContentCard.fulfilled, (state, action: PayloadAction<FetchSwapContentContentCardReturnData>) => {
                const currentContentCard = state.entities[action.payload.contentCardPosition.toString()];

                if (!currentContentCard) return;

                if (currentContentCard?.firstElement === ContentCardFirstElement.TEXT) {
                    currentContentCard.firstElement = ContentCardFirstElement.MEDIA;
                } else if (currentContentCard?.firstElement === ContentCardFirstElement.MEDIA) {
                    currentContentCard.firstElement = ContentCardFirstElement.TEXT;
                }

                ContentCardsAdapter.upsertOne(state, currentContentCard);
            })
            .addCase(fetchDeleteContentCard.fulfilled, (state, action: PayloadAction<FetchDeleteContentCardReturnData>) => {
                ContentCardsAdapter.removeAll(state);
                if (action.payload.contentCards.length) {
                    ContentCardsAdapter.addMany(state, action.payload.contentCards);
                }
            })
            .addCase(fetchMediaDeleteContentCard.fulfilled, (state, action: PayloadAction<FetchMediaDeleteContentCardReturnData>) => {
                ContentCardsAdapter.updateOne(
                    state,
                    {
                        id: action.payload.contentCardPosition,
                        changes: {
                            video: null,
                            videoPoster: null,
                            img: null,
                        },
                    },
                );
            })
            .addCase(fetchStaticUploadImage.fulfilled, (state, action: PayloadAction<FetchStaticUploadImageReturnData>) => {
                state.addingContentCardData.img = action.payload.fileName;
            })
            .addCase(fetchStaticUploadVideo.fulfilled, (state, action: PayloadAction<FetchStaticUploadVideoReturnData>) => {
                state.addingContentCardData.video = action.payload.videoFileName;
                state.addingContentCardData.videoPoster = action.payload.posterFileName;
            })
            .addCase(fetchAddContentCard.fulfilled, (state, action: PayloadAction<ContentCard>) => {
                state.addingContentCardData.video = undefined;
                state.addingContentCardData.videoPoster = undefined;
                state.addingContentCardData.img = undefined;
                state.addingContentCardData.text = '';
                state.addingContentCardData.alignText = ContentCardAlignText.LEFT;
                state.addingContentCardData.firstElement = ContentCardFirstElement.TEXT;

                ContentCardsAdapter.addOne(state, action.payload);
            })
            .addCase(fetchDeleteStaticMedia.fulfilled, (state) => {
                state.addingContentCardData.img = undefined;
                state.addingContentCardData.video = undefined;
                state.addingContentCardData.videoPoster = undefined;
            });
    },
});

export const { actions: AdminEngineeringPageActions } = AdminEngineeringPageSlice;
export const { reducer: AdminEngineeringPageReducer } = AdminEngineeringPageSlice;
