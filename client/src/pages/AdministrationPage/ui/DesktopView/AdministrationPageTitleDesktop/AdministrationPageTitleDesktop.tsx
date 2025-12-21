import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import cls from './AdministrationPageTitleDesktop.module.scss';

interface AdministrationPageTitleDesktopProps {
    className?: string;
}

export const AdministrationPageTitleDesktop = memo((props: AdministrationPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('administrationPage');

    return (
        <VStack
            maxW
            className={classNames(cls.AdministrationPageTitleDesktop, {}, [className])}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Администрация')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_DESKTOP}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Руководство')}
            </Text>
        </VStack>
    );
});
