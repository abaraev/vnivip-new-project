import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLinkMobile, AppLinkMobileTheme } from 'shared/ui/AppLink/MobileView/AppLinkMobile';
import cls from './FooterNavigationMobile.module.scss';

interface FooterNavigationMobileProps {
    className?: string;
}

export const FooterNavigationMobile = memo((props: FooterNavigationMobileProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <VStack
            className={classNames(cls.FooterNavigationMobile, {}, [className])}
            maxW
            gap={20}
        >
            <Text
                theme={TextTheme.GREY3}
                size={TextSize.BODY_MOBILE}
            >
                {`[ ${t('Навигация')} ]`}
            </Text>
            <VStack
                gap={10}
                maxW
            >
                <AppLinkMobile
                    to={RoutePath.news}
                    theme={AppLinkMobileTheme.GREY}
                >
                    {t('Новости')}
                </AppLinkMobile>
                <AppLinkMobile
                    to={RoutePath.partners}
                    theme={AppLinkMobileTheme.GREY}
                >
                    {t('Партнеры')}
                </AppLinkMobile>
                <AppLinkMobile
                    to={RoutePath.contacts}
                    theme={AppLinkMobileTheme.GREY}
                >
                    {t('Контакты')}
                </AppLinkMobile>
            </VStack>
        </VStack>
    );
});
