import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { ImageDesktop } from 'shared/ui/Image';
import { VideoDesktop } from 'shared/ui/Video/DesktopView/VideoDesktop';
import { useMediaQuery } from 'react-responsive';
import cls from './ParagraphDesktop.module.scss';
import { Paragraph } from '../../../model/types/Paragraph';

interface ParagraphDesktopProps {
    className?: string;
    data: Paragraph;
}

export const ParagraphDesktop = memo((props: ParagraphDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const isSmallScreen = useMediaQuery({ maxWidth: 1300 });

    const alignText = useCallback(() => {
        if (data.alignText === 'left') {
            return {
                align: TextAlign.LEFT,
            };
        }
        if (data.alignText === 'center') {
            return {
                align: TextAlign.CENTER,
            };
        }
        if (data.alignText === 'right') {
            return {
                align: TextAlign.RIGHT,
            };
        }
        if (data.alignText === 'justify') {
            return {
                align: TextAlign.JUSTIFY,
                textIndent: true,
            };
        }
    }, [data.alignText]);

    return (
        <VStack
            className={classNames(cls.ParagraphDesktop, {}, [className])}
            maxW
            gap={30}
            align="center"
        >
            {!!data.text && data.firstElement === 'text' && (
                <Text
                    theme={TextTheme.DARK}
                    size={isSmallScreen ? TextSize.BODY_S_DESKTOP : TextSize.BODY_DESKTOP}
                    className={cls.text}
                    {...alignText()}
                >
                    {data.text}
                </Text>
            )}
            {!!data.img && (
                <ImageDesktop
                    src={`${__API__}/static/images/${data.img}`}
                    borderR={10}
                    className={cls.media}
                />
            )}
            {!!data.video && (
                <VideoDesktop
                    src={`${__API__}/static/videos/${data.video}`}
                    poster={`${__API__}/static/videos/${data.videoPoster}`}
                    borderR={10}
                    className={cls.media}
                />
            )}
            {!!data.text && data.firstElement === 'media' && (
                <Text
                    theme={TextTheme.DARK}
                    size={isSmallScreen ? TextSize.BODY_S_DESKTOP : TextSize.BODY_DESKTOP}
                    className={cls.text}
                    {...alignText()}
                >
                    {data.text}
                </Text>
            )}
        </VStack>
    );
});
