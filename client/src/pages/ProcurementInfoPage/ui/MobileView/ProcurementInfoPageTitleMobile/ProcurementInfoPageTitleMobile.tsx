import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ProcurementInfoPageTitleMobile.module.scss';

interface ProcurementInfoPageTitleMobileProps {
    className?: string;
}

export const ProcurementInfoPageTitleMobile = memo((props: ProcurementInfoPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('procurementInfoPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ProcurementInfoPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Информация о закупках')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Информация о закупках')}
            </Text>
        </VStack>
    );
});
