import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from 'shared/ui/Stack';
import { SliderDesktop } from 'shared/ui/Slider/DesktopView/SliderDesktop';
import laboratory3Img from 'shared/assets/images/laboratory3.webp';
import laboratory4Img from 'shared/assets/images/laboratory4.webp';
import laboratory2Img from 'shared/assets/images/laboratory2.webp';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useMediaQuery } from 'react-responsive';
import cls from './MainPageGalleryDesktop.module.scss';

export const MainPageGalleryDesktop = memo(() => {
    const { t } = useTranslation('mainPage');
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery({ maxWidth: 1300 });

    return (
        <VStack
            maxW
            ContentTag="section"
            gap={40}
        >
            <HStack
                maxW
                justify="between"
            >
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.BODY_S_DESKTOP}
                >
                    {`[ ${t('Об институте')} ]`}
                </Text>
                <Text
                    theme={TextTheme.DARK2}
                    size={isSmallScreen ? TextSize.H3_DESKTOP : TextSize.H2_DESKTOP}
                    className={cls.title}
                >
                    {t('слайдер текст верхний')}
                </Text>
            </HStack>
            <SliderDesktop
                images={[
                    { src: laboratory2Img, alt: 'laboratory2Img' },
                    { src: laboratory3Img, alt: 'laboratory3Img' },
                    { src: laboratory4Img, alt: 'laboratory4Img' },
                ]}
            />
            <HStack
                maxW
                justify="between"
                align="end"
            >
                <Text
                    theme={TextTheme.DARK}
                    size={TextSize.BODY_S_DESKTOP}
                    className={cls.description}
                >
                    {t('слайдер текст нижний')}
                </Text>
                <ButtonDesktop
                    theme={ButtonDesktopTheme.PRIMARY}
                    onClick={() => navigate(RoutePath.about_institute)}
                >
                    {t('Об институте')}
                </ButtonDesktop>
            </HStack>
        </VStack>
    );
});
