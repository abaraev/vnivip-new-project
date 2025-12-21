import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import partner1Icon from 'shared/assets/icons/partner1-100-100.svg';
import partner2Icon from 'shared/assets/icons/partner2-100-100.svg';
import partner4Icon from 'shared/assets/icons/partner4-120-120.svg';
import partner5Icon from 'shared/assets/icons/partner5-230-100.svg';
import { CarouselMobile } from 'shared/ui/Carousel/MobileView/CarouselMobile';
import cls from './MainPagePartnersMobile.module.scss';

interface MainPagePartnersMobileProps {
    className?: string;
}

export const MainPagePartnersMobile = memo((props: MainPagePartnersMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('mainPage');

    return (
        <VStack
            className={classNames(cls.MainPagePartnersMobile, {}, [className])}
            gap={40}
            maxW
        >
            <Text
                size={TextSize.H1_MOBILE}
                theme={TextTheme.DARK2}
                className={cls.title}
            >
                {t('ПАРТНЕРЫ')}
            </Text>
            <CarouselMobile
                icons={[
                    partner1Icon,
                    partner2Icon,
                    partner4Icon,
                    partner5Icon,
                ]}
            />
        </VStack>
    );
});
