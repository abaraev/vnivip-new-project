import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './AdminOrdersDetailsContactsPageDesktop.module.scss';
import { getAdminOrdersDetailsPageOrder } from '../../../model/selectors/getAdminOrdersDetailsPage';

interface AdminOrdersDetailsContactsPageDesktopProps {
    className?: string;
}

export const AdminOrdersDetailsContactsPageDesktop = memo((props: AdminOrdersDetailsContactsPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const order = useSelector(getAdminOrdersDetailsPageOrder);

    return (
        <VStack
            gap={50}
            className={classNames(cls.AdminOrdersDetailsContactsPageDesktop, {}, [className])}
        >
            <VStack
                gap={10}
            >
                <HStack
                    gap={4}
                >
                    <Text
                        theme={TextTheme.BLUE2}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {`${t('Дата и время заказа')}:`}
                    </Text>
                    <Text
                        theme={TextTheme.DARK}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {new Date(order?.createdAt || '').toLocaleString()}
                    </Text>
                </HStack>
                <HStack
                    gap={4}
                >
                    <Text
                        theme={TextTheme.BLUE2}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {`${t('Имя')}:`}
                    </Text>
                    <Text
                        theme={TextTheme.DARK}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {order?.name}
                    </Text>
                </HStack>
                <HStack
                    gap={4}
                >
                    <Text
                        theme={TextTheme.BLUE2}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {`${t('Фамилия')}:`}
                    </Text>
                    <Text
                        theme={TextTheme.DARK}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {order?.secondName ? order?.secondName : t('Не указано')}
                    </Text>
                </HStack>
            </VStack>
            <VStack
                gap={10}
            >
                <HStack
                    gap={4}
                >
                    <Text
                        theme={TextTheme.BLUE2}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {`${t('Номер телефона')}:`}
                    </Text>
                    <Text
                        theme={TextTheme.DARK}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {order?.phone}
                    </Text>
                </HStack>
                <HStack
                    gap={4}
                >
                    <Text
                        theme={TextTheme.BLUE2}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {`${t('Почта')}:`}
                    </Text>
                    <Text
                        theme={TextTheme.DARK}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {order?.email}
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    );
});
