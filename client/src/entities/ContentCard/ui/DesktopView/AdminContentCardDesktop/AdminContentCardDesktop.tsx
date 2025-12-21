import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { ImageDesktop } from 'shared/ui/Image';
import { VideoDesktop } from 'shared/ui/Video/DesktopView/VideoDesktop';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowUp from 'shared/assets/icons/arrow-up-32-32-blue.svg';
import close from 'shared/assets/icons/close-32-32-red.svg';
import close2 from 'shared/assets/icons/close-24-24-red.svg';
import arrowDown from 'shared/assets/icons/arrow-down-32-32-blue.svg';
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
import cls from './AdminContentCardDesktop.module.scss';
import { ContentCard, ContentCardFirstElement } from '../../../model/types/ContentCard';

interface AdminContentCardDesktopProps {
    className?: string;
    data: ContentCard;
    onPositionUp?: (contentCardPosition: number) => void;
    onPositionDown?: (contentCardPosition: number) => void;
    onTextAlignLeft?: (contentCardPosition: number) => void;
    onTextAlignRight?: (contentCardPosition: number) => void;
    onTextAlignCenter?: (contentCardPosition: number) => void;
    onTextAlignJustify?: (contentCardPosition: number) => void;
    onContentSwap?: (contentCardPosition: number) => void;
    onUploadMedia?: (contentCardPosition: number, file: File) => void;
    onChangeText?: (contentCardPosition: number, text: string) => void;
    onDelete?: (contentCardPosition: number) => void;
    onMediaDelete?: (contentCardPosition: number) => void;
    contentCardsLength: number;
}

export const AdminContentCardDesktop = (props: AdminContentCardDesktopProps) => {
    const {
        className,
        data,
        onPositionUp,
        onPositionDown,
        onTextAlignLeft,
        onTextAlignRight,
        onTextAlignCenter,
        onTextAlignJustify,
        onContentSwap,
        onUploadMedia,
        onChangeText,
        onDelete,
        onMediaDelete,
        contentCardsLength,
    } = props;
    const { t } = useTranslation('admin');

    if (!data) return null;

    const alignText = useCallback(() => {
        if (data.alignText === 'left') {
            return {
                align: TextAreaAlign.LEFT,
            };
        }
        if (data.alignText === 'center') {
            return {
                align: TextAreaAlign.CENTER,
            };
        }
        if (data.alignText === 'right') {
            return {
                align: TextAreaAlign.RIGHT,
            };
        }
        if (data.alignText === 'justify') {
            return {
                align: TextAreaAlign.JUSTIFY,
                textIndent: true,
            };
        }
    }, [data.alignText]);

    const onPositionUpHandler = () => {
        onPositionUp?.(data.position);
    };

    const onPositionDownHandler = () => {
        onPositionDown?.(data.position);
    };

    const onContentSwapHandler = () => {
        onContentSwap?.(data.position);
    };

    const onTextAlignLeftHandler = () => {
        onTextAlignLeft?.(data.position);
    };

    const onTextAlignRightHandler = () => {
        onTextAlignRight?.(data.position);
    };

    const onTextAlignCenterHandler = () => {
        onTextAlignCenter?.(data.position);
    };

    const onTextAlignJustifyHandler = () => {
        onTextAlignJustify?.(data.position);
    };

    const onUploadMediaHandler = (file: File) => {
        onUploadMedia?.(data.position, file);
    };

    const onChangeTextHandler = (value: string) => {
        onChangeText?.(data.position, value);
    };

    const onDeleteHandler = () => {
        onDelete?.(data.position);
    };

    const onMediaDeleteHandler = () => {
        onMediaDelete?.(data.position);
    };

    return (
        <VStack
            className={classNames(cls.AdminContentCardDesktop, {}, [className])}
            maxW
            gap={40}
        >
            <HStack
                maxW
                justify="end"
            >
                <Icon
                    theme={IconTheme.CLICKABLE_BG}
                    Svg={close}
                    onClick={onDeleteHandler}
                />
            </HStack>
            {data.position > 0 && (
                <HStack
                    maxW
                    justify="center"
                >
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={arrowUp}
                        onClick={onPositionUpHandler}
                    />
                </HStack>
            )}
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
                        onChange={onChangeTextHandler}
                        className={cls.textArea}
                    />
                )}
                {data.firstElement === ContentCardFirstElement.TEXT && (
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={contentSwap}
                        onClick={onContentSwapHandler}
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
                            onClick={onMediaDeleteHandler}
                            className={cls.deleteMediaBtn}
                        />
                    </div>
                )}
                {!data.video && !data.img && (
                    <FileInput
                        accept=".jpg, .jpeg, .png, .mp4"
                        onChange={onUploadMediaHandler}
                    >
                        {t('Загрузить фото или видео')}
                    </FileInput>
                )}
                {data.firstElement === ContentCardFirstElement.MEDIA && (
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={contentSwap}
                        onClick={onContentSwapHandler}
                    />
                )}
                {data.firstElement === ContentCardFirstElement.MEDIA && (
                    <TextArea
                        theme={TextAreaTheme.DARK}
                        size={TextAreaSize.BODY_DESKTOP}
                        {...alignText()}
                        value={data.text || ''}
                        onChange={onChangeTextHandler}
                        className={cls.textArea}
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
                    onClick={onTextAlignLeftHandler}
                />
                <HStack
                    gap={20}
                >
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={textJustify}
                        onClick={onTextAlignJustifyHandler}
                    />
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={textCenter}
                        onClick={onTextAlignCenterHandler}
                    />
                </HStack>
                <Icon
                    theme={IconTheme.CLICKABLE_BG}
                    Svg={textRight}
                    onClick={onTextAlignRightHandler}
                />
            </HStack>
            {contentCardsLength - 1 > data.position && (
                <HStack
                    maxW
                    justify="center"
                >
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={arrowDown}
                        onClick={onPositionDownHandler}
                    />
                </HStack>
            )}
        </VStack>
    );
};
