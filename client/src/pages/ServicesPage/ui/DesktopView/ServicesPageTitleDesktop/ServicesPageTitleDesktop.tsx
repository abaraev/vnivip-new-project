import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ServicesPageTitleDesktop.module.scss';

interface ServicesPageTitleDesktopProps {
    className?: string;
}

export const ServicesPageTitleDesktop = memo((props: ServicesPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('servicesPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ServicesPageTitleDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Услуги')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_DESKTOP}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Услуги')}
            </Text>
        </VStack>
    );
});
