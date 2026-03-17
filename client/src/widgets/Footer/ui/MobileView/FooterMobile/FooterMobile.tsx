import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import mainLogoIcon from 'shared/assets/icons/main-logo.svg';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useLocation } from 'react-router-dom';
import { FooterContactsMobile } from '../FooterContactsMobile/FooterContactsMobile';
import { FooterNavigationMobile } from '../FooterNavigationMobile/FooterNavigationMobile';
import cls from './FooterMobile.module.scss';
import { FooterMenuMobile } from '../FooterMenuMobile/FooterMenuMobile';

interface FooterMobileProps {
    className?: string;
}

export const FooterMobile = memo((props: FooterMobileProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { pathname } = useLocation();

    if (pathname.includes('admin_')) {
        return null;
    }

    return (
        <VStack
            className={classNames(cls.FooterMobile, {}, [className])}
            ContentTag="footer"
            maxW
            paddingL={30}
            paddingR={30}
            paddingT={20}
            paddingB={20}
            gap={50}
        >
            <HStack
                maxW
                justify="center"
            >
                <Icon
                    Svg={mainLogoIcon}
                    theme={IconTheme.CLEAN}
                />
            </HStack>
            <FooterNavigationMobile />
            <FooterMenuMobile />
            <FooterContactsMobile />
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
                align={TextAlign.CENTER}
                className={cls.rights}
            >
                {t('Права защищены', { year: new Date().getFullYear() })}
            </Text>
        </VStack>
    );
});
