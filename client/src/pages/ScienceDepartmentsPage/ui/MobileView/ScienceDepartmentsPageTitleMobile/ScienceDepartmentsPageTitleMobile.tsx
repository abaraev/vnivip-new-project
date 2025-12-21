import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ScienceDepartmentsPageTitleMobile.module.scss';

interface ScienceDepartmentsPageTitleMobileProps {
    className?: string;
}

export const ScienceDepartmentsPageTitleMobile = memo((props: ScienceDepartmentsPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceDepartmentsPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Научные отделы')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Научные отделы')}
            </Text>
        </VStack>
    );
});
