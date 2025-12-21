import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { Service, ServiceDesktop } from 'entities/Service';
import { useTranslation } from 'react-i18next';
import { TextSize, TextTheme, Text } from 'shared/ui/Text/Text';
import { getCartPageServices } from '../../../model/selectors/getCartPage';
import cls from './CartPageServicesDesktop.module.scss';

interface CartPageServicesDesktopProps {
    className?: string;
}

export const CartPageServicesDesktop = memo((props: CartPageServicesDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('cartPage');
    const services = useSelector(getCartPageServices);

    return (
        <VStack
            className={classNames(cls.CartPageServicesDesktop, {}, [className])}
            padding={30}
            gap={40}
            maxH
        >
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H4_DESKTOP}
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
                        paddingR={10}
                    >
                        {services?.map((service) => (
                            <ServiceDesktop
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
                            size={TextSize.BODY_L_DESKTOP}
                        >
                            {t('Нет добавленных услуг')}
                        </Text>
                    </HStack>
                )}
        </VStack>
    );
});
