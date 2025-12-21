import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './EducationPageTitleDesktop.module.scss';

interface EducationPageTitleDesktopProps {
    className?: string;
}

export const EducationPageTitleDesktop = memo((props: EducationPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('educationPage');

    return (
        <VStack
            maxW
            className={classNames(cls.EducationPageTitleDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Образование')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_DESKTOP}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Образование')}
            </Text>
        </VStack>
    );
});
