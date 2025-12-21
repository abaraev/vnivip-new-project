import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
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
import cls from './AdminParagraphDesktop.module.scss';
import { Paragraph, ParagraphFirstElement } from '../../../model/types/Paragraph';

interface AdminParagraphDesktopProps {
    className?: string;
    data: Paragraph;
    onPositionUp?: (paragraphPosition: number) => void;
    onPositionDown?: (paragraphPosition: number) => void;
    onTextAlignLeft?: (paragraphPosition: number) => void;
    onTextAlignRight?: (paragraphPosition: number) => void;
    onTextAlignCenter?: (paragraphPosition: number) => void;
    onTextAlignJustify?: (paragraphPosition: number) => void;
    onContentSwap?: (paragraphPosition: number) => void;
    onUploadMedia?: (paragraphPosition: number, file: File) => void;
    onChangeText?: (paragraphPosition: number, text: string) => void;
    onDelete?: (paragraphPosition: number) => void;
    onMediaDelete?: (paragraphPosition: number) => void;
    paragraphsLength: number;
}

export const AdminParagraphDesktop = (props: AdminParagraphDesktopProps) => {
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
        paragraphsLength,
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
            className={classNames(cls.AdminParagraphDesktop, {}, [className])}
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
                {data.firstElement === ParagraphFirstElement.TEXT && (
                    <TextArea
                        theme={TextAreaTheme.DARK}
                        size={TextAreaSize.BODY_DESKTOP}
                        {...alignText()}
                        value={data.text || ''}
                        onChange={onChangeTextHandler}
                        className={cls.textArea}
                    />
                )}
                {data.firstElement === ParagraphFirstElement.TEXT && (
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
                {data.firstElement === ParagraphFirstElement.MEDIA && (
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={contentSwap}
                        onClick={onContentSwapHandler}
                    />
                )}
                {data.firstElement === ParagraphFirstElement.MEDIA && (
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
            {paragraphsLength - 1 > data.position && (
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
