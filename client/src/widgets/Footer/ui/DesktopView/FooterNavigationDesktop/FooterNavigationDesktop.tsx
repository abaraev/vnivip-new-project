import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AppLinkDesktop, AppLinkDesktopTheme } from 'shared/ui/AppLink/DesktopView/AppLinkDesktop';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './FooterNavigationDesktop.module.scss';

interface FooterNavigationDesktopProps {
    className?: string;
}

export const FooterNavigationDesktop = memo((props: FooterNavigationDesktopProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <VStack
            className={classNames(cls.FooterNavigationDesktop, {}, [className])}
            maxH
            gap={40}
        >
            <Text
                theme={TextTheme.GREY3}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Навигация')} ]`}
            </Text>
            <VStack
                gap={10}
                maxW
            >
                <AppLinkDesktop
                    to={RoutePath.news}
                    theme={AppLinkDesktopTheme.GREY}
                    className={cls.link}
                >
                    {t('Новости')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.partners}
                    theme={AppLinkDesktopTheme.GREY}
                    className={cls.link}
                >
                    {t('Партнеры')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.contacts}
                    theme={AppLinkDesktopTheme.GREY}
                    className={cls.link}
                >
                    {t('Контакты')}
                </AppLinkDesktop>
            </VStack>
        </VStack>
    );
});
