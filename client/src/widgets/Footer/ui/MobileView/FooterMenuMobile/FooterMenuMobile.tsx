import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AppLinkMobile, AppLinkMobileTheme } from 'shared/ui/AppLink/MobileView/AppLinkMobile';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './FooterMenuMobile.module.scss';

interface FooterMenuMobileProps {
    className?: string;
}

export const FooterMenuMobile = memo((props: FooterMenuMobileProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <VStack
            className={classNames(cls.FooterMenuMobile, {}, [className])}
            maxW
            gap={20}
        >
            <Text
                theme={TextTheme.GREY3}
                size={TextSize.BODY_MOBILE}
            >
                {`[ ${t('Меню')} ]`}
            </Text>
            <VStack
                gap={10}
                maxW
            >
                <AppLinkMobile
                    to={RoutePath.about_institute}
                    theme={AppLinkMobileTheme.GREY}
                >
                    {t('Об институте')}
                </AppLinkMobile>
                <AppLinkMobile
                    to={RoutePath.science_education_activity}
                    theme={AppLinkMobileTheme.GREY}
                >
                    {t('Научная и образовательная деятельность')}
                </AppLinkMobile>
                <AppLinkMobile
                    to="#"
                    theme={AppLinkMobileTheme.GREY}
                >
                    {t('Услуги')}
                </AppLinkMobile>
            </VStack>
        </VStack>
    );
});
