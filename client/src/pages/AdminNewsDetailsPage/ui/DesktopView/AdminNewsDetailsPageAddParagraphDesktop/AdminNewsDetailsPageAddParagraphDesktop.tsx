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
import { ParagraphAlignText, ParagraphFirstElement } from 'entities/Paragraph';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { fetchAddParagraph } from '../../../model/services/fetchAddParagraph';
import { fetchDeleteStaticMedia } from '../../../model/services/fetchDeleteStaticMedia';
import { AdminNewsDetailsPageActions } from '../../../model/slices/AdminNewsDetailsPageSlice';
import { fetchStaticUploadImage } from '../../../model/services/fetchStaticUploadImage';
import { fetchStaticUploadVideo } from '../../../model/services/fetchStaticUploadVideo';
import cls from './AdminNewsDetailsPageAddParagraphDesktop.module.scss';
import { getAdminNewsDetailsPageAddingParagraphData } from '../../../model/selectors/getAdminNewsDetailsPage';

interface AdminNewsDetailsPageAddParagraphDesktopProps {
    className?: string;
}

export const AdminNewsDetailsPageAddParagraphDesktop = (props: AdminNewsDetailsPageAddParagraphDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const data = useSelector(getAdminNewsDetailsPageAddingParagraphData);
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
        dispatch(AdminNewsDetailsPageActions.swapContentAddingParagraph());
    }, [dispatch]);

    const onTextAlignLeft = useCallback(() => {
        dispatch(AdminNewsDetailsPageActions.setAddingParagraphAlignText(ParagraphAlignText.LEFT));
    }, [dispatch]);

    const onTextAlignRight = useCallback(() => {
        dispatch(AdminNewsDetailsPageActions.setAddingParagraphAlignText(ParagraphAlignText.RIGHT));
    }, [dispatch]);

    const onTextAlignCenter = useCallback(() => {
        dispatch(AdminNewsDetailsPageActions.setAddingParagraphAlignText(ParagraphAlignText.CENTER));
    }, [dispatch]);

    const onTextAlignJustify = useCallback(() => {
        dispatch(AdminNewsDetailsPageActions.setAddingParagraphAlignText(ParagraphAlignText.JUSTIFY));
    }, [dispatch]);

    const onUploadMedia = useCallback((file: File) => {
        if (file.type.includes('mp4')) {
            if (file.size < 100 * 1024 * 1024) {
                dispatch(fetchStaticUploadVideo({ file }));
            } else {
                alert('Максимальный размер видео 100 МБ.');
            }
        } else if (file.type.includes('jpg') || file.type.includes('jpeg') || file.type.includes('png')) {
            if (file.size < 20 * 1024 * 1024) {
                dispatch(fetchStaticUploadImage({ file }));
            } else {
                alert('Максимальный размер фото 20 МБ.');
            }
        }
    }, [dispatch]);

    const onChangeText = useCallback((value: string) => {
        dispatch(AdminNewsDetailsPageActions.setAddingParagraphText(value));
    }, [dispatch]);

    const onMediaDelete = useCallback(() => {
        dispatch(fetchDeleteStaticMedia());
    }, [dispatch]);

    const onAddParagraph = useCallback(() => {
        dispatch(fetchAddParagraph());
    }, [dispatch]);

    if (!data) return null;

    return (
        <VStack
            className={classNames(cls.AdminNewsDetailsPageAddParagraphDesktop, {}, [className])}
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
                    onClick={onAddParagraph}
                >
                    {t('Добавить')}
                </ButtonDesktop>
            </HStack>
            <VStack
                gap={30}
                maxW
                align="center"
            >
                {data.firstElement === ParagraphFirstElement.TEXT && (
                    <TextArea
                        theme={TextAreaTheme.DARK}
                        size={TextAreaSize.BODY_DESKTOP}
                        {...alignText()}
                        value={data.text || ''}
                        onChange={onChangeText}
                    />
                )}
                {data.firstElement === ParagraphFirstElement.TEXT && (
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
                {data.firstElement === ParagraphFirstElement.MEDIA && (
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={contentSwap}
                        onClick={onContentSwap}
                    />
                )}
                {data.firstElement === ParagraphFirstElement.MEDIA && (
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
