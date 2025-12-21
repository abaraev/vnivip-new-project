import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import cls from './AcademicCouncilPageTitleMobile.module.scss';

interface AcademicCouncilPageTitleMobileProps {
    className?: string;
}

export const AcademicCouncilPageTitleMobile = memo((props: AcademicCouncilPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('academicCouncilPage');

    return (
        <VStack
            maxW
            className={classNames(cls.AcademicCouncilPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Ученый совет')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Ученый совет')}
            </Text>
        </VStack>
    );
});
