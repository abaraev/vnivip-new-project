import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { AnchorAlign, AnchorMobile, AnchorMobileTheme } from 'shared/ui/Anchor/MobileView/AnchorMobile';
import { useTranslation } from 'react-i18next';
import cls from './PartnersPageCardMobile.module.scss';

interface PartnersPageCardMobileProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    name: string;
    description: string;
    link: string;
}

export const PartnersPageCardMobile = memo((props: PartnersPageCardMobileProps) => {
    const {
        className,
        Svg,
        name,
        description,
        link,
    } = props;
    const { t } = useTranslation('partnersPage');

    return (
        <VStack
            className={classNames(cls.PartnersPageCardMobile, {}, [className])}
            gap={20}
            align="center"
            maxW
            paddingT={20}
            paddingL={20}
            paddingR={30}
            paddingB={30}
        >
            <Icon
                Svg={Svg}
                theme={IconTheme.CLEAN}
            />
            <VStack
                maxW
                align="center"
                gap={30}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_MEDIUM_MOBILE}
                    align={TextAlign.CENTER}
                >
                    {name}
                </Text>
                <Text
                    theme={TextTheme.DARK}
                    size={TextSize.BODY_S_MOBILE}
                    align={TextAlign.JUSTIFY}
                    textIndent
                    className={cls.description}
                >
                    {description}
                </Text>
                <AnchorMobile
                    theme={AnchorMobileTheme.BLUE}
                    href={link}
                    className={cls.link}
                    align={AnchorAlign.CENTER}
                >
                    {t('Официальная веб-страница организации')}
                </AnchorMobile>
            </VStack>
        </VStack>
    );
});
