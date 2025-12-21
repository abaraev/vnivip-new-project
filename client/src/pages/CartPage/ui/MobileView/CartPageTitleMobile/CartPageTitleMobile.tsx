import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './CartPageTitleMobile.module.scss';

interface CartPageTitleMobileProps {
    className?: string;
}

export const CartPageTitleMobile = memo((props: CartPageTitleMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('cartPage');

    return (
        <VStack
            maxW
            className={classNames(cls.CartPageTitleMobile, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Корзина')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_MOBILE}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Оформление заказа')}
            </Text>
        </VStack>
    );
});
