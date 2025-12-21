import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import cls from './AdministrationPageTitleMobile.module.scss';

interface AdministrationPageTitleMobileProps {
    className?: string;
}

export const AdministrationPageTitleMobile = memo((props: AdministrationPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('administrationPage');

    return (
        <VStack
            maxW
            className={classNames(cls.AdministrationPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Администрация')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Руководство')}
            </Text>
        </VStack>
    );
});
