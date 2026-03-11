import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { AppLinkDesktop, AppLinkDesktopTheme } from 'shared/ui/AppLink/DesktopView/AppLinkDesktop';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import cls from './AdminSidebarDesktop.module.scss';

interface AdminSidebarDesktopProps {
    className?: string;
}

export const AdminSidebarDesktop = memo((props: AdminSidebarDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const { pathname } = useLocation();

    return (
        <VStack
            className={classNames(cls.AdminSidebarDesktop, {}, [className])}
            maxH
            padding={30}
            gap={50}
        >
            <Text
                theme={TextTheme.WHITE}
                size={TextSize.H4_DESKTOP}
                align={TextAlign.CENTER}
                className={cls.title}
            >
                {t('Админ-меню')}
            </Text>
            <VStack
                maxW
                align="center"
                gap={8}
            >
                <AppLinkDesktop
                    to={RoutePath.admin_orders}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_orders) }, [])}
                >
                    {t('Заказы')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.admin_services}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_services) }, [])}
                >
                    {t('Услуги')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.admin_news}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_news) }, [])}
                >
                    {t('Новости')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.admin_acts}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_acts) }, [])}
                >
                    {t('Нормативно-правовые акты')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.admin_members}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_members) }, [])}
                >
                    {t('Сотрудники')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.admin_competitions}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_competitions) }, [])}
                >
                    {t('Конкурсы')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.admin_vacancies}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_vacancies) }, [])}
                >
                    {t('Вакансии')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.admin_recent_events}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_recent_events) }, [])}
                >
                    {t('Недавние события')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.admin_education}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_education) }, [])}
                >
                    {t('Образование')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    to={RoutePath.admin_library}
                    theme={AppLinkDesktopTheme.WHITE2}
                    className={classNames(cls.link, { [cls.currentSection]: pathname.includes(RoutePath.admin_library) }, [])}
                >
                    {t('Научная библиотека')}
                </AppLinkDesktop>
            </VStack>
        </VStack>
    );
});
