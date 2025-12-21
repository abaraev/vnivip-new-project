import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import cls from './AcademicCouncilPageTitleDesktop.module.scss';

interface AcademicCouncilPageTitleDesktopProps {
    className?: string;
}

export const AcademicCouncilPageTitleDesktop = memo((props: AcademicCouncilPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('academicCouncilPage');

    return (
        <VStack
            maxW
            className={classNames(cls.AcademicCouncilPageTitleDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Ученый совет')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_DESKTOP}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Ученый совет')}
            </Text>
        </VStack>
    );
});
