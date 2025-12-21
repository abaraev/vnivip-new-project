import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useParams } from 'react-router-dom';
import { AdminParagraphDesktop, ParagraphAlignText } from 'entities/Paragraph';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchStaticUploadVideo } from 'pages/AdminNewsDetailsPage/model/services/fetchStaticUploadVideo';
import { fetchStaticUploadImage } from 'pages/AdminNewsDetailsPage/model/services/fetchStaticUploadImage';
import {
    AdminNewsDetailsPageAddParagraphDesktop,
} from '../AdminNewsDetailsPageAddParagraphDesktop/AdminNewsDetailsPageAddParagraphDesktop';
import { fetchMediaDeleteParagraph } from '../../../model/services/fetchMediaDeleteParagraph';
import { fetchChangeTextParagraph } from '../../../model/services/fetchChangeTextParagraph';
import { fetchSwapContentParagraph } from '../../../model/services/fetchSwapContentParagraph';
import { fetchSetAlignTextParagraph } from '../../../model/services/fetchSetAlignTextParagraph';
import { fetchUpPositionParagraph } from '../../../model/services/fetchUpPositionParagraph';
import { fetchUploadImage } from '../../../model/services/fetchUploadImage';
import { fetchUploadVideo } from '../../../model/services/fetchUploadVideo';
import { AdminNewsDetailsPageTitleDesktop } from '../AdminNewsDetailsPageTitleDesktop/AdminNewsDetailsPageTitleDesktop';
import { fetchNews } from '../../../model/services/fetchNews';
import {
    AdminNewsDetailsPageActions,
    AdminNewsDetailsPageReducer,
    getParagraphs,
} from '../../../model/slices/AdminNewsDetailsPageSlice';
import {
    getAdminNewsDetailsPageInited,
    getAdminNewsDetailsPageNews,
} from '../../../model/selectors/getAdminNewsDetailsPage';
import cls from './AdminNewsDetailsPageDesktop.module.scss';
import { fetchDownPositionParagraph } from '../../../model/services/fetchDownPositionParagraph';
import { fetchDeleteParagraph } from '../../../model/services/fetchDeleteParagraph';

interface AdminNewsDetailsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminNewsDetailsPage: AdminNewsDetailsPageReducer,
};

const AdminNewsDetailsPageDesktop = memo((props: AdminNewsDetailsPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('admin');
    const { id } = useParams();
    const inited = useSelector(getAdminNewsDetailsPageInited);
    const news = useSelector(getAdminNewsDetailsPageNews);
    const paragraphs = useSelector(getParagraphs.selectAll);

    useEffect(() => {
        if (paragraphs.length) {
            const sorted = [...paragraphs];
        }
    }, [paragraphs]);

    useEffect(() => {
        if (!inited && id) {
            dispatch(fetchNews({ newsId: Number(id) }));
            dispatch(AdminNewsDetailsPageActions.init());
        }
    }, [dispatch, id, inited]);

    const onPositionUp = useCallback((paragraphPosition: number) => {
        dispatch(fetchUpPositionParagraph({ paragraphPosition }));
    }, [dispatch]);

    const onPositionDown = useCallback((paragraphPosition: number) => {
        dispatch(fetchDownPositionParagraph({ paragraphPosition }));
    }, [dispatch]);

    const onContentSwap = useCallback((paragraphPosition: number) => {
        dispatch(fetchSwapContentParagraph({ paragraphPosition }));
    }, [dispatch]);

    const onTextAlignLeft = useCallback((paragraphPosition: number) => {
        dispatch(fetchSetAlignTextParagraph({ paragraphPosition, alignText: ParagraphAlignText.LEFT }));
    }, [dispatch]);

    const onTextAlignRight = useCallback((paragraphPosition: number) => {
        dispatch(fetchSetAlignTextParagraph({ paragraphPosition, alignText: ParagraphAlignText.RIGHT }));
    }, [dispatch]);

    const onTextAlignCenter = useCallback((paragraphPosition: number) => {
        dispatch(fetchSetAlignTextParagraph({ paragraphPosition, alignText: ParagraphAlignText.CENTER }));
    }, [dispatch]);

    const onTextAlignJustify = useCallback((paragraphPosition: number) => {
        dispatch(fetchSetAlignTextParagraph({ paragraphPosition, alignText: ParagraphAlignText.JUSTIFY }));
    }, [dispatch]);

    const onUploadMedia = useCallback((paragraphPosition: number, file: File) => {
        if (file.type.includes('mp4')) {
            if (file.size < 100 * 1024 * 1024) {
                dispatch(fetchUploadVideo({ file, paragraphPosition }));
            } else {
                alert('Максимальный размер видео 100 МБ.');
            }
        } else if (file.type.includes('jpg') || file.type.includes('jpeg') || file.type.includes('png')) {
            if (file.size < 20 * 1024 * 1024) {
                dispatch(fetchUploadImage({ file, paragraphPosition }));
            } else {
                alert('Максимальный размер фото 20 МБ.');
            }
        }
    }, [dispatch]);

    const fetchChangeTextParagraphFunc = useCallback(async (paragraphPosition: number, text: string) => {
        const result = await dispatch(fetchChangeTextParagraph({ paragraphPosition, text }));
        if (result.meta.requestStatus === 'rejected') {
            dispatch(AdminNewsDetailsPageActions.setParagraphText({ paragraphPosition, text: '' }));
        }
    }, [dispatch]);

    const debouncedFetchChangeTextParagraph = useDebounce(fetchChangeTextParagraphFunc, 300);

    const onChangeText = useCallback((paragraphPosition: number, text: string) => {
        dispatch(AdminNewsDetailsPageActions.setParagraphText({ paragraphPosition, text }));

        debouncedFetchChangeTextParagraph(paragraphPosition, text);
    }, [dispatch, debouncedFetchChangeTextParagraph]);

    const onDelete = useCallback((paragraphPosition: number) => {
        dispatch(fetchDeleteParagraph({ paragraphPosition }));
    }, [dispatch]);

    const onMediaDelete = useCallback((paragraphPosition: number) => {
        dispatch(fetchMediaDeleteParagraph({ paragraphPosition }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AdminNewsDetailsPageDesktop, {}, [className])}
                align="center"
                maxH
            >
                <VStack
                    className={cls.contentWrapper}
                    gap={80}
                    paddingT={50}
                    paddingL={30}
                    paddingR={30}
                    paddingB={50}
                >
                    <AdminNewsDetailsPageTitleDesktop />
                    <VStack
                        gap={30}
                        maxW
                    >
                        {paragraphs.map((item) => (
                            <AdminParagraphDesktop
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
                                paragraphsLength={paragraphs.length}
                                key={item.id}
                            />
                        ))}
                    </VStack>
                    <AdminNewsDetailsPageAddParagraphDesktop />
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminNewsDetailsPageDesktop;
