import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import mainLogoIcon from 'shared/assets/icons/main-logo.svg';
import cls from './FooterLeftDesktop.module.scss';

interface FooterLeftDesktopProps {
    className?: string;
}

export const FooterLeftDesktop = memo((props: FooterLeftDesktopProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <VStack
            className={classNames(cls.FooterLeftDesktop, {}, [className])}
            justify="between"
            align="center"
            maxH
            paddingL={10}
            paddingR={10}
        >
            <Icon
                Svg={mainLogoIcon}
                theme={IconTheme.CLEAN}
            />
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
                align={TextAlign.CENTER}
            >
                {t('Права защищены')}
            </Text>
        </VStack>
    );
});
