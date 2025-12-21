import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack } from 'shared/ui/Stack';
import { FooterMenuDesktop } from 'widgets/Footer/ui/DesktopView/FooterMenuDesktop/FooterMenuDesktop';
import { FooterContactsDesktop } from 'widgets/Footer/ui/DesktopView/FooterContactsDesktop/FooterContactsDesktop';
import { useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './FooterDesktop.module.scss';
import { FooterLeftDesktop } from '../FooterLeftDesktop/FooterLeftDesktop';
import { FooterNavigationDesktop } from '../FooterNavigationDesktop/FooterNavigationDesktop';

interface FooterDesktopProps {
    className?: string;
}

export const FooterDesktop = memo((props: FooterDesktopProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { pathname } = useLocation();

    if (pathname.includes('admin_')) {
        return null;
    }

    return (
        <HStack
            className={classNames(cls.FooterDesktop, {}, [className])}
            ContentTag="footer"
            maxW
        >
            <FooterLeftDesktop />
            <HStack
                className={cls.rightBlocks}
                maxH
            >
                <FooterNavigationDesktop />
                <FooterMenuDesktop />
                <FooterContactsDesktop />
            </HStack>
        </HStack>
    );
});
