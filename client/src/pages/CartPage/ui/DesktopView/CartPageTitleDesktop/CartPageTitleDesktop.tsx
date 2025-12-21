import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './CartPageTitleDesktop.module.scss';

interface CartPageTitleDesktopProps {
    className?: string;
}

export const CartPageTitleDesktop = memo((props: CartPageTitleDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('cartPage');

    return (
        <VStack
            maxW
            className={classNames(cls.CartPageTitleDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
            >
                {`[ ${t('Корзина')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H2_DESKTOP}
                className={cls.mainTitle}
                align={TextAlign.CENTER}
            >
                {t('Оформление заказа')}
            </Text>
        </VStack>
    );
});
