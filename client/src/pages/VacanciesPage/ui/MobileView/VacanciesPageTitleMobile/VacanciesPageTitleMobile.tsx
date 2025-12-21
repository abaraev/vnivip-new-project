import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './VacanciesPageTitleMobile.module.scss';

interface VacanciesPageTitleMobileProps {
    className?: string;
}

export const VacanciesPageTitleMobile = memo((props: VacanciesPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('vacanciesPage');

    return (
        <VStack
            maxW
            className={classNames(cls.VacanciesPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Вакансии')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Вакансии')}
            </Text>
        </VStack>
    );
});
