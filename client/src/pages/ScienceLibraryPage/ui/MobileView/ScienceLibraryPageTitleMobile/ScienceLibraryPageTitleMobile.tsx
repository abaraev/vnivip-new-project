import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ScienceLibraryPageTitleMobile.module.scss';

interface ScienceLibraryPageTitleMobileProps {
    className?: string;
}

export const ScienceLibraryPageTitleMobile = memo((props: ScienceLibraryPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceLibraryPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceLibraryPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Научная библиотека')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Научная библиотека')}
            </Text>
        </VStack>
    );
});
