import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ServicesPageTitleMobile.module.scss';

interface ServicesPageTitleMobileProps {
    className?: string;
}

export const ServicesPageTitleMobile = memo((props: ServicesPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('servicesPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ServicesPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Услуги')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Услуги')}
            </Text>
        </VStack>
    );
});
