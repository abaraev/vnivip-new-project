import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { ImageMobile } from 'shared/ui/Image';
import { VideoMobile } from 'shared/ui/Video/MobileView/VideoMobile';
import cls from './ParagraphMobile.module.scss';
import { Paragraph } from '../../../model/types/Paragraph';

interface ParagraphMobileProps {
    className?: string;
    data: Paragraph;
}

export const ParagraphMobile = memo((props: ParagraphMobileProps) => {
    const {
        className,
        data,
    } = props;

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
            className={classNames(cls.ParagraphMobile, {}, [className])}
            maxW
            gap={30}
            align="center"
        >
            {!!data.text && data.firstElement === 'text' && (
                <Text
                    theme={TextTheme.DARK}
                    size={TextSize.BODY_MOBILE}
                    className={cls.text}
                    {...alignText()}
                >
                    {data.text}
                </Text>
            )}
            {!!data.img && (
                <ImageMobile
                    src={`${__API__}/static/images/${data.img}`}
                    borderR={10}
                    className={cls.media}
                />
            )}
            {!!data.video && (
                <VideoMobile
                    src={`${__API__}/static/videos/${data.video}`}
                    poster={`${__API__}/static/videos/${data.videoPoster}`}
                    borderR={10}
                    className={cls.media}
                />
            )}
            {!!data.text && data.firstElement === 'media' && (
                <Text
                    theme={TextTheme.DARK}
                    size={TextSize.BODY_MOBILE}
                    className={cls.text}
                    {...alignText()}
                >
                    {data.text}
                </Text>
            )}
        </VStack>
    );
});
