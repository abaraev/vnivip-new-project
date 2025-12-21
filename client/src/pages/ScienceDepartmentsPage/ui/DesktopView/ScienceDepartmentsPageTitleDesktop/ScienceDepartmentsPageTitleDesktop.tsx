import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import cls from './ScienceDepartmentsPageTitleDesktop.module.scss';

interface ScienceDepartmentsPageTitleDesktopProps {
    className?: string;
}

export const ScienceDepartmentsPageTitleDesktop = memo((props: ScienceDepartmentsPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceDepartmentsPageTitleDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Научные отделы')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_DESKTOP}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Научные отделы')}
            </Text>
        </VStack>
    );
});
