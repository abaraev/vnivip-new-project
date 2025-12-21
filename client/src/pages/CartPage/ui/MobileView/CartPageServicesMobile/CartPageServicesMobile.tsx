import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { ServiceMobile } from 'entities/Service';
import { useTranslation } from 'react-i18next';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { getCartPageServices } from '../../../model/selectors/getCartPage';
import cls from './CartPageServicesMobile.module.scss';

interface CartPageServicesMobileProps {
    className?: string;
}

export const CartPageServicesMobile = memo((props: CartPageServicesMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('cartPage');
    const services = useSelector(getCartPageServices);

    return (
        <VStack
            className={classNames(cls.CartPageServicesMobile, {}, [className])}
            padding={16}
            gap={30}
            maxW
        >
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H3_MOBILE}
            >
                {`${t('Корзина')} (${services?.length || 0})`}
            </Text>
            {services?.length
                ? (
                    <HStack
                        wrap="wrap"
                        maxW
                        gap={20}
                        className={cls.servicesList}
                    >
                        {services?.map((service) => (
                            <ServiceMobile
                                data={service}
                                className={cls.service}
                            />
                        ))}
                    </HStack>
                )
                : (
                    <HStack
                        maxW
                        justify="center"
                        align="center"
                        className={cls.emptyText}
                    >
                        <Text
                            theme={TextTheme.BLUE2}
                            size={TextSize.BODY_L_MOBILE}
                        >
                            {t('Нет добавленных услуг')}
                        </Text>
                    </HStack>
                )}
        </VStack>
    );
});
