import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { ImageMobile } from 'shared/ui/Image';
import laboratoryImg from 'shared/assets/images/laboratory1.webp';
import cls from './MainPageAboutUsMobile.module.scss';

interface MainPageAboutUsMobileProps {
    className?: string;
}

export const MainPageAboutUsMobile = memo((props: MainPageAboutUsMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('mainPage');

    return (
        <VStack
            maxW
            ContentTag="section"
            gap={30}
        >
            <Card
                padding={30}
                borderRbr={50}
                borderRbl={50}
                borderRtl={50}
                maxW
                theme={CardTheme.BLUE_LIGHT}
            >
                <VStack
                    gap={20}
                >
                    <Text
                        size={TextSize.LARGE_MOBILE}
                        theme={TextTheme.DARK2}
                        align={TextAlign.CENTER}
                        className={cls.cardTitle}
                    >
                        {t('О нас')}
                    </Text>
                    <Text
                        size={TextSize.BODY_L_MOBILE}
                        theme={TextTheme.DARK}
                        align={TextAlign.CENTER}
                    >
                        {t('текст о нас верхний')}
                    </Text>
                </VStack>
            </Card>
            <VStack
                gap={30}
                maxW
                align="center"
            >
                <ImageMobile
                    src={laboratoryImg}
                    borderR={50}
                    className={cls.img}
                />
                <Text
                    size={TextSize.BODY_MOBILE}
                    theme={TextTheme.DARK}
                    className={cls.imgText}
                >
                    {t('текст о нас нижний')}
                </Text>
            </VStack>
        </VStack>
    );
});
