import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './CompetitionsPageTitleDesktop.module.scss';

interface CompetitionsPageTitleDesktopProps {
    className?: string;
}

export const CompetitionsPageTitleDesktop = memo((props: CompetitionsPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('competitionsPage');

    return (
        <VStack
            maxW
            className={classNames(cls.CompetitionsPageTitleDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Конкурсы')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_DESKTOP}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Объявления о конкурсах')}
            </Text>
        </VStack>
    );
});
