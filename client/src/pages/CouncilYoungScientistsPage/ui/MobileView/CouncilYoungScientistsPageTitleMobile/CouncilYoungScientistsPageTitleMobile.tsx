import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import cls from './CouncilYoungScientistsPageTitleMobile.module.scss';

interface CouncilYoungScientistsPageTitleMobileProps {
    className?: string;
}

export const CouncilYoungScientistsPageTitleMobile = memo((props: CouncilYoungScientistsPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('councilYoungScientistsPage');

    return (
        <VStack
            maxW
            className={classNames(cls.CouncilYoungScientistsPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Совет молодых ученых')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Совет молодых ученых')}
            </Text>
        </VStack>
    );
});
