import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ScienceEducationActivityPageTitleMobile.module.scss';

interface ScienceEducationActivityPageTitleMobileProps {
    className?: string;
}

export const ScienceEducationActivityPageTitleMobile = memo((props: ScienceEducationActivityPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceEducationActivityPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceEducationActivityPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Научная и образовательная деятельность')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Научная и образовательная деятельность')}
            </Text>
        </VStack>
    );
});
