import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ClinicPageTitleDesktop.module.scss';

interface ClinicPageTitleDesktopProps {
    className?: string;
}

export const ClinicPageTitleDesktop = memo((props: ClinicPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('clinicPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ClinicPageTitleDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Доклинические и клинические исследования')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_DESKTOP}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Доклинические и клинические исследования')}
            </Text>
        </VStack>
    );
});
