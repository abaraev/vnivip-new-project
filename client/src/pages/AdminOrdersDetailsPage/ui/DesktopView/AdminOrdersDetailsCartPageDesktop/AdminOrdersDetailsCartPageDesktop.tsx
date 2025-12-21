import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AdminServiceDesktop, Service } from 'entities/Service';
import cls from './AdminOrdersDetailsCartPageDesktop.module.scss';
import { getAdminOrdersDetailsPageOrder } from '../../../model/selectors/getAdminOrdersDetailsPage';

interface AdminOrdersDetailsCartPageDesktopProps {
    className?: string;
}

export const AdminOrdersDetailsCartPageDesktop = memo((props: AdminOrdersDetailsCartPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const order = useSelector(getAdminOrdersDetailsPageOrder);
    const cart: Service[] = useMemo(() => {
        if (order) {
            return JSON.parse(order.cart);
        }
    }, [order]);

    const totalSum: string | undefined = useMemo(() => {
        if (order) {
            let sum = 0;
            cart.forEach((service) => {
                sum += service.price * service.amount;
            });

            return sum.toFixed(2);
        }
    }, [cart, order]);

    return (
        <VStack
            maxW
            className={classNames(cls.AdminOrdersDetailsCartPageDesktop, {}, [className])}
            gap={60}
            padding={30}
        >
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H4_DESKTOP}
            >
                {`${t('Корзина клиента')} (${cart?.length})`}
            </Text>
            <HStack
                maxW
                wrap="wrap"
                gap={30}
            >
                {cart?.map((service) => (
                    <AdminServiceDesktop
                        data={service}
                    />
                ))}
            </HStack>
            <HStack
                className={cls.totalSumWrapper}
                maxW
                padding={50}
                align="center"
                justify="center"
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.H4_DESKTOP}
                    className={cls.totalSum}
                >
                    {`${t('Всего к оплате')}: ${totalSum}`}
                </Text>
            </HStack>
        </VStack>
    );
});
