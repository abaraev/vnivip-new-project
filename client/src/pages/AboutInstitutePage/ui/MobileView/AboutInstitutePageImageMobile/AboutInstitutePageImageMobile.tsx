import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { ImageMobile } from 'shared/ui/Image';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import cls from './AboutInstitutePageImageMobile.module.scss';

interface AboutInstitutePageImageMobileProps {
    className?: string;
    src: string;
    text: string;
}

export const AboutInstitutePageImageMobile = memo((props: AboutInstitutePageImageMobileProps) => {
    const {
        className,
        src,
        text,
    } = props;

    return (
        <VStack
            className={classNames(cls.AboutInstitutePageImageMobile, {}, [className])}
            maxW
            gap={10}
            align="center"
        >
            <ImageMobile
                src={src}
                className={cls.image}
                borderR={10}
            />
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
                align={TextAlign.RIGHT}
            >
                {text}
            </Text>
        </VStack>
    );
});
