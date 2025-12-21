import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './PartnersPageTitleMobile.module.scss';

interface PartnersPageTitleMobileProps {
    className?: string;
}

export const PartnersPageTitleMobile = memo((props: PartnersPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('partnersPage');

    return (
        <VStack
            maxW
            className={classNames(cls.PartnersPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Партнеры')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Сотрудничество ВНИВИП')}
            </Text>
        </VStack>
    );
});
