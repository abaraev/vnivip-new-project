import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ActsPageTitleMobile.module.scss';

interface ActsPageTitleMobileProps {
    className?: string;
}

export const ActsPageTitleMobile = memo((props: ActsPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('actsPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ActsPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Нормативно-правовые акты')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Нормативно-правовые акты')}
            </Text>
        </VStack>
    );
});
