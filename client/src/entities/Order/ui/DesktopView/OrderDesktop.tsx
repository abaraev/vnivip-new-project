import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Order, OrderStatus } from '../../model/types/Order';
import cls from './OrderDesktop.module.scss';

interface OrderDesktopProps {
    className?: string;
    data: Order;
}

export const OrderDesktop = memo((props: OrderDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation('admin');
    const navigate = useNavigate();

    const orderStatusMap: Record<OrderStatus, string> = {
        [OrderStatus.PENDING]: t('В ожидании'),
        [OrderStatus.COMPLETED]: t('Выполнен'),
        [OrderStatus.CANCELLED]: t('Отменен'),
    };

    const orderStatusClassMap: Record<OrderStatus, string> = {
        [OrderStatus.PENDING]: cls.statusTextOrange,
        [OrderStatus.COMPLETED]: cls.statusTextGreen,
        [OrderStatus.CANCELLED]: cls.statusTextRed,
    };

    return (
        <Card
            className={classNames(cls.OrderDesktop, {}, [className])}
            theme={CardTheme.CLEAN}
            borderR={20}
            padding={16}
        >
            <VStack
                maxW
                gap={40}
            >
                <HStack
                    maxW
                    justify="between"
                    align="center"
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {`${t('Заказ')} №${data.id}`}
                    </Text>
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.BODY_MINI_DESKTOP}
                        className={orderStatusClassMap[data.status]}
                    >
                        {orderStatusMap[data.status]}
                    </Text>
                </HStack>
                <VStack
                    maxW
                    gap={30}
                >
                    <VStack
                        maxW
                        gap={10}
                    >
                        <HStack
                            gap={4}
                        >
                            <Text
                                theme={TextTheme.BLUE2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Дата и время заказа')}:`}
                            </Text>
                            <Text
                                theme={TextTheme.DARK}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {new Date(data.createdAt).toLocaleString()}
                            </Text>
                        </HStack>
                        <HStack
                            gap={4}
                        >
                            <Text
                                theme={TextTheme.BLUE2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Имя')}:`}
                            </Text>
                            <Text
                                theme={TextTheme.DARK}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {data.name}
                            </Text>
                        </HStack>
                        <HStack
                            gap={4}
                        >
                            <Text
                                theme={TextTheme.BLUE2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Фамилия')}:`}
                            </Text>
                            <Text
                                theme={TextTheme.DARK}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {data.secondName ? data.secondName : t('Не указано')}
                            </Text>
                        </HStack>
                        <HStack
                            gap={4}
                        >
                            <Text
                                theme={TextTheme.BLUE2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Корзина')}:`}
                            </Text>
                            <Text
                                theme={TextTheme.DARK}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {t('наименований', { length: JSON.parse(data.cart).length })}
                            </Text>
                        </HStack>
                    </VStack>
                    <VStack
                        maxW
                        gap={10}
                    >
                        <HStack
                            gap={4}
                        >
                            <Text
                                theme={TextTheme.BLUE2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Номер телефона')}:`}
                            </Text>
                            <Text
                                theme={TextTheme.DARK}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {data.phone}
                            </Text>
                        </HStack>
                        <HStack
                            gap={4}
                        >
                            <Text
                                theme={TextTheme.BLUE2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Почта')}:`}
                            </Text>
                            <Text
                                theme={TextTheme.DARK}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {data.email}
                            </Text>
                        </HStack>
                    </VStack>
                </VStack>
                <HStack
                    maxW
                    justify="end"
                >
                    <ButtonDesktop
                        theme={ButtonDesktopTheme.PRIMARY}
                        onClick={() => navigate(`${RoutePath.admin_orders}/${data.id}`)}
                    >
                        {t('Открыть')}
                    </ButtonDesktop>
                </HStack>
            </VStack>
        </Card>
    );
});
