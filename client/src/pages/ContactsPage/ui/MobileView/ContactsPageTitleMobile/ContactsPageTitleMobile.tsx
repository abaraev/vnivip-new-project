import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './ContactsPageTitleMobile.module.scss';

interface ContactsPageTitleMobileProps {
    className?: string;
}

export const ContactsPageTitleMobile = memo((props: ContactsPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('contactsPage');

    return (
        <VStack
            maxW
            className={classNames(cls.ContactsPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Контакты')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Наши контакты')}
            </Text>
        </VStack>
    );
});
