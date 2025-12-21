import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import cls from './CouncilYoungScientistsPageTitleDesktop.module.scss';

interface CouncilYoungScientistsPageTitleDesktopProps {
    className?: string;
}

export const CouncilYoungScientistsPageTitleDesktop = memo((props: CouncilYoungScientistsPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('councilYoungScientistsPage');

    return (
        <VStack
            maxW
            className={classNames(cls.CouncilYoungScientistsPageTitleDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Совет молодых ученых')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_DESKTOP}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Совет молодых ученых')}
            </Text>
        </VStack>
    );
});
