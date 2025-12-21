import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './EducationPageTitleMobile.module.scss';

interface EducationPageTitleMobileProps {
    className?: string;
}

export const EducationPageTitleMobile = memo((props: EducationPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('educationPage');

    return (
        <VStack
            maxW
            className={classNames(cls.EducationPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Образование')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Образование')}
            </Text>
        </VStack>
    );
});
