import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    TextArea, TextAreaAlign, TextAreaSize, TextAreaTheme,
} from 'shared/ui/TextArea/TextArea';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import close2 from 'shared/assets/icons/close-24-24-red.svg';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Modal } from 'shared/ui/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Select } from 'shared/ui/Select/Select';
import { fetchStaticUploadImage } from 'pages/AdminNewsDetailsPage/model/services/fetchStaticUploadImage';
import { fetchChangeCover } from '../../../model/services/fetchChangeCover';
import { fetchDeleteNews } from '../../../model/services/fetchDeleteNews';
import { fetchPublishNews } from '../../../model/services/fetchPublishNews';
import { fetchHideNews } from '../../../model/services/fetchHideNews';
import { fetchChangeTitle } from '../../../model/services/fetchChangeTitle';
import { fetchChangeDescription } from '../../../model/services/fetchChangeDescription';
import { AdminNewsDetailsPageActions, getParagraphs } from '../../../model/slices/AdminNewsDetailsPageSlice';
import {
    getAdminNewsDetailsPageCoverImg,
    getAdminNewsDetailsPageDescription,
    getAdminNewsDetailsPageNews,
    getAdminNewsDetailsPageNewsDay,
    getAdminNewsDetailsPageNewsMonth,
    getAdminNewsDetailsPageNewsYear,
    getAdminNewsDetailsPagePublished,
    getAdminNewsDetailsPageTitle,
} from '../../../model/selectors/getAdminNewsDetailsPage';
import cls from './AdminNewsDetailsPageTitleDesktop.module.scss';
import { fetchDeleteCover } from '../../../model/services/fetchDeleteCover';
import { fetchChangeDate } from '../../../model/services/fetchChangeDate';

interface AdminNewsDetailsPageTitleDesktopProps {
    className?: string;
}

export const AdminNewsDetailsPageTitleDesktop = memo((props: AdminNewsDetailsPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const news = useSelector(getAdminNewsDetailsPageNews);
    const published = useSelector(getAdminNewsDetailsPagePublished);
    const title = useSelector(getAdminNewsDetailsPageTitle);
    const description = useSelector(getAdminNewsDetailsPageDescription);
    const newsDay = useSelector(getAdminNewsDetailsPageNewsDay);
    const newsMonth = useSelector(getAdminNewsDetailsPageNewsMonth);
    const newsYear = useSelector(getAdminNewsDetailsPageNewsYear);
    const coverImg = useSelector(getAdminNewsDetailsPageCoverImg);
    const paragraphs = useSelector(getParagraphs.selectAll);
    const dispatch = useAppDispatch();
    const [isOpenDeleteNewsModal, bindDeleteNewsModal] = useModal();
    const navigate = useNavigate();

    const fetchChangeTitleFunc = useCallback(() => {
        dispatch(fetchChangeTitle());
    }, [dispatch]);

    const fetchChangeDescriptionFunc = useCallback(() => {
        dispatch(fetchChangeDescription());
    }, [dispatch]);

    const debouncedFetchChangeTitle = useDebounce(fetchChangeTitleFunc, 300);
    const debouncedFetchChangeDescription = useDebounce(fetchChangeDescriptionFunc, 300);

    const onChangeTitle = useCallback((value: string) => {
        if (value.length <= 250) {
            dispatch(AdminNewsDetailsPageActions.setTitle(value));
            debouncedFetchChangeTitle();
        }
    }, [dispatch, debouncedFetchChangeTitle]);

    const onChangeDescription = useCallback((value: string) => {
        if (value.length <= 512) {
            dispatch(AdminNewsDetailsPageActions.setDescription(value));
            debouncedFetchChangeDescription();
        }
    }, [dispatch, debouncedFetchChangeDescription]);

    const onHideClick = useCallback(async () => {
        const result = await dispatch(fetchHideNews());
        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(AdminNewsDetailsPageActions.setPublished(false));
        }
    }, [dispatch]);

    const onPublishClick = useCallback(async () => {
        const result = await dispatch(fetchPublishNews());
        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(AdminNewsDetailsPageActions.setPublished(true));
        }
    }, [dispatch]);

    const onDeleteCover = useCallback(() => {
        dispatch(fetchDeleteCover());
    }, [dispatch]);

    const onDeleteNews = useCallback(async () => {
        const result = await dispatch(fetchDeleteNews());
        if (result.meta.requestStatus === 'fulfilled') {
            bindDeleteNewsModal.onCloseModal();
            navigate(RoutePath.admin_news);
        }
    }, [bindDeleteNewsModal, dispatch, navigate]);

    const onChangeCover = useCallback((file: File) => {
        if (file.type.includes('jpg') || file.type.includes('jpeg') || file.type.includes('png')) {
            if (file.size < 50 * 1024 * 1024) {
                dispatch(fetchChangeCover({ file }));
            } else {
                alert('Максимальный размер изображения 50 МБ.');
            }
        }
    }, [dispatch]);

    const onChangeNewsDay = useCallback((value: string) => {
        dispatch(AdminNewsDetailsPageActions.setNewsDay(value));
        dispatch(fetchChangeDate());
    }, [dispatch]);

    const onChangeNewsMonth = useCallback((value: string) => {
        dispatch(AdminNewsDetailsPageActions.setNewsMonth(value));
        dispatch(fetchChangeDate());
    }, [dispatch]);

    const onChangeNewsYear = useCallback((value: string) => {
        dispatch(AdminNewsDetailsPageActions.setNewsYear(value));
        dispatch(fetchChangeDate());
    }, [dispatch]);

    const style: CSSProperties = {
        backgroundImage: `url(${__API__}/static/images/${coverImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <VStack
            className={classNames(cls.AdminNewsDetailsPageTitleDesktop, {}, [className])}
            gap={20}
            maxW
            align="center"
        >
            <HStack
                align="center"
                justify="between"
                maxW
            >
                {!published && (
                    <Text
                        theme={TextTheme.RED}
                        size={TextSize.BODY_S_DESKTOP}
                    >
                        {t('Не опубликована')}
                    </Text>
                )}
                {published && (
                    <Text
                        theme={TextTheme.GREEN}
                        size={TextSize.BODY_S_DESKTOP}
                    >
                        {t('Опубликована')}
                    </Text>
                )}
                <HStack
                    align="center"
                    gap={30}
                >
                    {!published && (
                        <ButtonDesktop
                            theme={ButtonDesktopTheme.OUTLINE}
                            className={!paragraphs.length || !title ? cls.btnDisabled : undefined}
                            onClick={onPublishClick}
                        >
                            {t('Опубликовать')}
                        </ButtonDesktop>
                    )}
                    {published && (
                        <ButtonDesktop
                            theme={ButtonDesktopTheme.OUTLINE}
                            onClick={onHideClick}
                        >
                            {t('Скрыть')}
                        </ButtonDesktop>
                    )}
                    <ButtonDesktop
                        theme={ButtonDesktopTheme.OUTLINE_RED}
                        onClick={bindDeleteNewsModal.onShowModal}
                    >
                        {t('Удалить')}
                    </ButtonDesktop>
                    <Modal
                        onClose={bindDeleteNewsModal.onCloseModal}
                        isOpen={isOpenDeleteNewsModal}
                    >
                        <VStack
                            align="center"
                            gap={50}
                        >
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {t('Вы действительно хотите удалить эту новость?')}
                            </Text>
                            <HStack
                                gap={30}
                            >
                                <ButtonDesktop
                                    theme={ButtonDesktopTheme.OUTLINE}
                                    onClick={bindDeleteNewsModal.onCloseModal}
                                >
                                    {t('Нет')}
                                </ButtonDesktop>
                                <ButtonDesktop
                                    theme={ButtonDesktopTheme.PRIMARY}
                                    onClick={onDeleteNews}
                                >
                                    {t('Да')}
                                </ButtonDesktop>
                            </HStack>
                        </VStack>
                    </Modal>
                </HStack>
            </HStack>
            <div
                className={cls.cover}
                style={style}
            >
                {coverImg && (
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={close2}
                        className={cls.deleteCoverBtn}
                        onClick={onDeleteCover}
                    />
                )}
                <FileInput
                    accept=".jpg, .jpeg, .png"
                    className={cls.coverInput}
                    onChange={onChangeCover}
                >
                    {t('Изменить фоновое изображение')}
                </FileInput>
            </div>
            <HStack
                maxW
                paddingB={50}
                justify="between"
                align="center"
            >
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.BODY_S_DESKTOP}
                >
                    {`${t('Дата создания')}: ${new Date(Number(news?.timestamp) || news?.createdAt || '')
                        .toLocaleDateString().replace(/\./g, '/')}`}
                </Text>
                <HStack
                    gap={20}
                    align="center"
                >
                    <Select
                        options={new Array(31)
                            .fill(0)
                            .map((item, index) => ({
                                content: (1 + index).toString(),
                                value: (1 + index).toString(),
                            }))}
                        value={newsDay}
                        size={5}
                        onChange={onChangeNewsDay}
                    />
                    <Select
                        options={new Array(12)
                            .fill(0)
                            .map((item, index) => ({
                                content: (1 + index).toString(),
                                value: (1 + index).toString(),
                            }))}
                        value={newsMonth}
                        size={5}
                        onChange={onChangeNewsMonth}
                    />
                    <Select
                        options={new Array(31)
                            .fill(0)
                            .map((item, index) => ({
                                content: (2020 + index).toString(),
                                value: (2020 + index).toString(),
                            }))}
                        value={newsYear}
                        size={5}
                        onChange={onChangeNewsYear}
                    />
                </HStack>
            </HStack>
            <TextArea
                theme={TextAreaTheme.DARK2}
                size={TextAreaSize.H2_DESKTOP}
                align={TextAreaAlign.CENTER}
                value={title || ''}
                className={cls.title}
                onChange={onChangeTitle}
            />
            <TextArea
                theme={TextAreaTheme.DARK2}
                size={TextAreaSize.BODY_L_DESKTOP}
                align={TextAreaAlign.CENTER}
                value={description || ''}
                className={cls.description}
                onChange={onChangeDescription}
            />
        </VStack>
    );
});
