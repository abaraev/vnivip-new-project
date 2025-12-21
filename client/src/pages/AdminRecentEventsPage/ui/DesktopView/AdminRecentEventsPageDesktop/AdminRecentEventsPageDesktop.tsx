import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AdminContentCardDesktop, ContentCardAlignText } from 'entities/ContentCard';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchContentCards } from '../../../model/services/fetchContentCards';
import {
    AdminRecentEventsPageAddContentCardDesktop,
} from '../AdminRecentEventsPageAddContentCardDesktop/AdminRecentEventsPageAddContentCardDesktop';
import { fetchMediaDeleteContentCard } from '../../../model/services/fetchMediaDeleteContentCard';
import { fetchChangeTextContentCard } from '../../../model/services/fetchChangeTextContentCard';
import { fetchSwapContentContentCard } from '../../../model/services/fetchSwapContentContentCard';
import { fetchSetAlignTextContentCard } from '../../../model/services/fetchSetAlignTextContentCard';
import { fetchUpPositionContentCard } from '../../../model/services/fetchUpPositionContentCard';
import { fetchUploadImage } from '../../../model/services/fetchUploadImage';
import { fetchUploadVideo } from '../../../model/services/fetchUploadVideo';
import {
    AdminRecentEventsPageActions,
    AdminRecentEventsPageReducer,
    getContentCards,
} from '../../../model/slices/AdminRecentEventsPageSlice';
import { getAdminRecentEventsPageInited } from '../../../model/selectors/getAdminRecentEventsPage';
import cls from './AdminRecentEventsPageDesktop.module.scss';
import { fetchDownPositionContentCard } from '../../../model/services/fetchDownPositionContentCard';
import { fetchDeleteContentCard } from '../../../model/services/fetchDeleteContentCard';

interface AdminRecentEventsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminRecentEventsPage: AdminRecentEventsPageReducer,
};

const AdminRecentEventsPageDesktop = memo((props: AdminRecentEventsPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('admin');
    const inited = useSelector(getAdminRecentEventsPageInited);
    const сontentCards = useSelector(getContentCards.selectAll);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchContentCards());
            dispatch(AdminRecentEventsPageActions.init());
        }
    }, [dispatch, inited]);

    const onPositionUp = useCallback((contentCardPosition: number) => {
        dispatch(fetchUpPositionContentCard({ contentCardPosition }));
    }, [dispatch]);

    const onPositionDown = useCallback((contentCardPosition: number) => {
        dispatch(fetchDownPositionContentCard({ contentCardPosition }));
    }, [dispatch]);

    const onContentSwap = useCallback((contentCardPosition: number) => {
        dispatch(fetchSwapContentContentCard({ contentCardPosition }));
    }, [dispatch]);

    const onTextAlignLeft = useCallback((contentCardPosition: number) => {
        dispatch(fetchSetAlignTextContentCard({ contentCardPosition, alignText: ContentCardAlignText.LEFT }));
    }, [dispatch]);

    const onTextAlignRight = useCallback((contentCardPosition: number) => {
        dispatch(fetchSetAlignTextContentCard({ contentCardPosition, alignText: ContentCardAlignText.RIGHT }));
    }, [dispatch]);

    const onTextAlignCenter = useCallback((contentCardPosition: number) => {
        dispatch(fetchSetAlignTextContentCard({ contentCardPosition, alignText: ContentCardAlignText.CENTER }));
    }, [dispatch]);

    const onTextAlignJustify = useCallback((contentCardPosition: number) => {
        dispatch(fetchSetAlignTextContentCard({ contentCardPosition, alignText: ContentCardAlignText.JUSTIFY }));
    }, [dispatch]);

    const onUploadMedia = useCallback((contentCardPosition: number, file: File) => {
        if (file.type.includes('mp4')) {
            dispatch(fetchUploadVideo({ file, contentCardPosition }));
        } else if (file.type.includes('jpg') || file.type.includes('jpeg') || file.type.includes('png')) {
            dispatch(fetchUploadImage({ file, contentCardPosition }));
        }
    }, [dispatch]);

    const fetchChangeTextContentCardFunc = useCallback(async (contentCardPosition: number, text: string) => {
        const result = await dispatch(fetchChangeTextContentCard({ contentCardPosition, text }));
        if (result.meta.requestStatus === 'rejected') {
            dispatch(AdminRecentEventsPageActions.setContentCardText({ contentCardPosition, text: '' }));
        }
    }, [dispatch]);

    const debouncedFetchChangeTextContentCard = useDebounce(fetchChangeTextContentCardFunc, 300);

    const onChangeText = useCallback((contentCardPosition: number, text: string) => {
        dispatch(AdminRecentEventsPageActions.setContentCardText({ contentCardPosition, text }));

        debouncedFetchChangeTextContentCard(contentCardPosition, text);
    }, [dispatch, debouncedFetchChangeTextContentCard]);

    const onDelete = useCallback((contentCardPosition: number) => {
        dispatch(fetchDeleteContentCard({ contentCardPosition }));
    }, [dispatch]);

    const onMediaDelete = useCallback((contentCardPosition: number) => {
        dispatch(fetchMediaDeleteContentCard({ contentCardPosition }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AdminRecentEventsPageDesktop, {}, [className])}
                align="center"
                maxH
            >
                <VStack
                    className={cls.contentWrapper}
                    maxH
                    justify="between"
                    gap={80}
                    paddingT={50}
                    paddingL={30}
                    paddingR={30}
                    paddingB={50}
                >
                    <VStack
                        gap={30}
                        maxW
                    >
                        {сontentCards.map((item) => (
                            <AdminContentCardDesktop
                                data={item}
                                onPositionUp={onPositionUp}
                                onPositionDown={onPositionDown}
                                onContentSwap={onContentSwap}
                                onTextAlignLeft={onTextAlignLeft}
                                onTextAlignRight={onTextAlignRight}
                                onTextAlignCenter={onTextAlignCenter}
                                onTextAlignJustify={onTextAlignJustify}
                                onUploadMedia={onUploadMedia}
                                onChangeText={onChangeText}
                                onDelete={onDelete}
                                onMediaDelete={onMediaDelete}
                                contentCardsLength={сontentCards.length}
                                key={item.id}
                            />
                        ))}
                    </VStack>
                    <AdminRecentEventsPageAddContentCardDesktop />
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminRecentEventsPageDesktop;
