import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from 'shared/ui/Stack';
import { SliderMobile } from 'shared/ui/Slider/MobileView/SliderMobile';
import laboratory3Img from 'shared/assets/images/laboratory3.webp';
import laboratory4Img from 'shared/assets/images/laboratory4.webp';
import laboratory2Img from 'shared/assets/images/laboratory2.webp';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { ButtonMobile, ButtonMobileTheme } from 'shared/ui/Button/MobileView/ButtonMobile';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import cls from './MainPageGalleryMobile.module.scss';

export const MainPageGalleryMobile = memo(() => {
    const { t } = useTranslation('mainPage');
    const navigate = useNavigate();

    return (
        <VStack
            maxW
            ContentTag="section"
            gap={30}
        >
            <VStack
                maxW
                gap={20}
            >
                <HStack
                    maxW
                >
                    <Text
                        theme={TextTheme.GREY}
                        size={TextSize.BODY_S_MOBILE}
                    >
                        {`[ ${t('Об институте')} ]`}
                    </Text>
                </HStack>
                <HStack
                    maxW
                    justify="end"
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.H3_MOBILE}
                        className={cls.title}
                    >
                        {t('слайдер текст верхний')}
                    </Text>
                </HStack>
            </VStack>
            <SliderMobile
                images={[
                    { src: laboratory2Img, alt: 'laboratory2Img' },
                    { src: laboratory3Img, alt: 'laboratory3Img' },
                    { src: laboratory4Img, alt: 'laboratory4Img' },
                ]}
            />
            <VStack
                maxW
                align="center"
                gap={30}
            >
                <Text
                    theme={TextTheme.DARK}
                    size={TextSize.BODY_MOBILE}
                >
                    {t('слайдер текст нижний')}
                </Text>
                <ButtonMobile
                    theme={ButtonMobileTheme.PRIMARY}
                    onClick={() => navigate(RoutePath.about_institute)}
                >
                    {t('Об институте')}
                </ButtonMobile>
            </VStack>
        </VStack>
    );
});
