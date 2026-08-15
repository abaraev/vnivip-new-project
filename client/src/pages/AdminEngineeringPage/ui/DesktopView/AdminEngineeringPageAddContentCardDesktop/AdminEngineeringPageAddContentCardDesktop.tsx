import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { ImageDesktop } from 'shared/ui/Image';
import { VideoDesktop } from 'shared/ui/Video/DesktopView/VideoDesktop';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import close2 from 'shared/assets/icons/close-24-24-red.svg';
import textCenter from 'shared/assets/icons/text-center-24-24-blue.svg';
import textJustify from 'shared/assets/icons/text-justify-24-24-blue.svg';
import textRight from 'shared/assets/icons/text-right-24-24-blue.svg';
import textLeft from 'shared/assets/icons/text-left-24-24-blue.svg';
import contentSwap from 'shared/assets/icons/swap-24-24-blue.svg';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { useTranslation } from 'react-i18next';
import {
    TextArea, TextAreaAlign, TextAreaSize, TextAreaTheme,
} from 'shared/ui/TextArea/TextArea';
import { ContentCardAlignText, ContentCardFirstElement } from 'entities/ContentCard';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { fetchAddContentCard } from '../../../model/services/fetchAddContentCard';
import { fetchDeleteStaticMedia } from '../../../model/services/fetchDeleteStaticMedia';
import { AdminEngineeringPageActions } from '../../../model/slices/AdminEngineeringPageSlice';
import { fetchStaticUploadImage } from '../../../model/services/fetchStaticUploadImage';
import { fetchStaticUploadVideo } from '../../../model/services/fetchStaticUploadVideo';
import cls from './AdminEngineeringPageAddContentCardDesktop.module.scss';
import { getAdminEngineeringPageAddingContentCardData } from '../../../model/selectors/getAdminEngineeringPage';

interface AdminEngineeringPageAddContentCardDesktopProps {
    className?: string;
}

export const AdminEngineeringPageAddContentCardDesktop = (props: AdminEngineeringPageAddContentCardDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const data = useSelector(getAdminEngineeringPageAddingContentCardData);
    const dispatch = useAppDispatch();

    const alignText = useCallback(() => {
        if (data?.alignText === 'left') {
            return {
                align: TextAreaAlign.LEFT,
            };
        }
        if (data?.alignText === 'center') {
            return {
                align: TextAreaAlign.CENTER,
            };
        }
        if (data?.alignText === 'right') {
            return {
                align: TextAreaAlign.RIGHT,
            };
        }
        if (data?.alignText === 'justify') {
            return {
                align: TextAreaAlign.JUSTIFY,
                textIndent: true,
            };
        }

        return undefined;
    }, [data?.alignText]);

    const onContentSwap = useCallback(() => {
        dispatch(AdminEngineeringPageActions.swapContentAddingContentCard());
    }, [dispatch]);

    const onTextAlignLeft = useCallback(() => {
        dispatch(AdminEngineeringPageActions.setAddingContentCardAlignText(ContentCardAlignText.LEFT));
    }, [dispatch]);

    const onTextAlignRight = useCallback(() => {
        dispatch(AdminEngineeringPageActions.setAddingContentCardAlignText(ContentCardAlignText.RIGHT));
    }, [dispatch]);

    const onTextAlignCenter = useCallback(() => {
        dispatch(AdminEngineeringPageActions.setAddingContentCardAlignText(ContentCardAlignText.CENTER));
    }, [dispatch]);

    const onTextAlignJustify = useCallback(() => {
        dispatch(AdminEngineeringPageActions.setAddingContentCardAlignText(ContentCardAlignText.JUSTIFY));
    }, [dispatch]);

    const onUploadMedia = useCallback((file: File) => {
        if (file.type.includes('mp4')) {
            dispatch(fetchStaticUploadVideo({ file }));
        } else if (file.type.includes('jpg') || file.type.includes('jpeg') || file.type.includes('png')) {
            dispatch(fetchStaticUploadImage({ file }));
        }
    }, [dispatch]);

    const onChangeText = useCallback((value: string) => {
        dispatch(AdminEngineeringPageActions.setAddingContentCardText(value));
    }, [dispatch]);

    const onMediaDelete = useCallback(() => {
        dispatch(fetchDeleteStaticMedia());
    }, [dispatch]);

    const onAddContentCard = useCallback(() => {
        dispatch(fetchAddContentCard());
    }, [dispatch]);

    if (!data) return null;

    return (
        <VStack
            className={classNames(cls.AdminEngineeringPageAddContentCardDesktop, {}, [className])}
            maxW
            gap={40}
        >
            <HStack
                justify="center"
                maxW
            >
                <ButtonDesktop
                    theme={ButtonDesktopTheme.PRIMARY}
                    className={data.text || data.video || data.img ? undefined : cls.addBtnDisabled}
                    onClick={onAddContentCard}
                >
                    {t('Добавить')}
                </ButtonDesktop>
            </HStack>
            <VStack
                gap={30}
                maxW
                align="center"
            >
                {data.firstElement === ContentCardFirstElement.TEXT && (
                    <TextArea
                        theme={TextAreaTheme.DARK}
                        size={TextAreaSize.BODY_DESKTOP}
                        {...alignText()}
                        value={data.text || ''}
                        onChange={onChangeText}
                    />
                )}
                {data.firstElement === ContentCardFirstElement.TEXT && (
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={contentSwap}
                        onClick={onContentSwap}
                    />
                )}
                {(!!data.img || !!data.video) && (
                    <div
                        className={cls.mediaWrapper}
                    >
                        {!!data.img && (
                            <ImageDesktop
                                src={`${__API__}/static/images/${data.img}`}
                                className={cls.media}
                            />
                        )}
                        {!!data.video && (
                            <VideoDesktop
                                src={`${__API__}/static/videos/${data.video}`}
                                poster={`${__API__}/static/videos/${data.videoPoster}`}
                                className={cls.media}
                            />
                        )}
                        <Icon
                            theme={IconTheme.CLICKABLE_BG}
                            Svg={close2}
                            onClick={onMediaDelete}
                            className={cls.deleteMediaBtn}
                        />
                    </div>
                )}
                {!data.video && !data.img && (
                    <FileInput
                        accept=".jpg, .jpeg, .png, .mp4"
                        onChange={onUploadMedia}
                    >
                        {t('Загрузить фото или видео')}
                    </FileInput>
                )}
                {data.firstElement === ContentCardFirstElement.MEDIA && (
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={contentSwap}
                        onClick={onContentSwap}
                    />
                )}
                {data.firstElement === ContentCardFirstElement.MEDIA && (
                    <TextArea
                        theme={TextAreaTheme.DARK}
                        size={TextAreaSize.BODY_DESKTOP}
                        {...alignText()}
                        value={data.text || ''}
                        onChange={onChangeText}
                    />
                )}
            </VStack>
            <HStack
                maxW
                justify="between"
            >
                <Icon
                    theme={IconTheme.CLICKABLE_BG}
                    Svg={textLeft}
                    onClick={onTextAlignLeft}
                />
                <HStack
                    gap={20}
                >
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={textJustify}
                        onClick={onTextAlignJustify}
                    />
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={textCenter}
                        onClick={onTextAlignCenter}
                    />
                </HStack>
                <Icon
                    theme={IconTheme.CLICKABLE_BG}
                    Svg={textRight}
                    onClick={onTextAlignRight}
                />
            </HStack>
        </VStack>
    );
};
