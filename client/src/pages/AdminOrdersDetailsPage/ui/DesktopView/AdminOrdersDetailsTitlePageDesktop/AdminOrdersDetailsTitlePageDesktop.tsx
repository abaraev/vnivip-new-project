import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { OrderTabsDesktop } from 'shared/ui/OrderTabs/DesktopView/OrderTabsDesktop';
import { OrderStatus } from 'entities/Order';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchSetStatus } from 'pages/AdminOrdersDetailsPage/model/services/fetchSetStatus';
import { AdminOrdersDetailsPageActions } from '../../../model/slices/AdminOrdersDetailsPageSlice';
import {
    getAdminOrdersDetailsPageIsChanged,
    getAdminOrdersDetailsPageOrder,
    getAdminOrdersDetailsPageOrderStatus,
} from '../../../model/selectors/getAdminOrdersDetailsPage';
import cls from './AdminOrdersDetailsTitlePageDesktop.module.scss';

interface AdminOrdersDetailsTitlePageDesktopProps {
    className?: string;
}

export const AdminOrdersDetailsTitlePageDesktop = memo((props: AdminOrdersDetailsTitlePageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const dispatch = useAppDispatch();
    const order = useSelector(getAdminOrdersDetailsPageOrder);
    const orderStatus = useSelector(getAdminOrdersDetailsPageOrderStatus);
    const isChanged = useSelector(getAdminOrdersDetailsPageIsChanged);

    const onChangeStatus = useCallback((value: OrderStatus) => {
        dispatch(AdminOrdersDetailsPageActions.setStatus(value));
    }, [dispatch]);

    const onSaveClick = useCallback(() => {
        dispatch(fetchSetStatus());
    }, [dispatch]);

    if (!order) {
        return null;
    }

    return (
        <VStack
            className={classNames(cls.AdminOrdersDetailsTitlePageDesktop, {}, [className])}
            maxW
            align="end"
            gap={100}
        >
            <HStack
                maxW
                justify="between"
                align="center"
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.H4_DESKTOP}
                >
                    {`${t('Заказ')} №${order?.id}`}
                </Text>
                <OrderTabsDesktop
                    value={orderStatus || ''}
                    onTabClick={onChangeStatus}
                    tabs={[
                        {
                            value: OrderStatus.PENDING,
                            text: t('В ожидании'),
                        },
                        {
                            value: OrderStatus.CANCELLED,
                            text: t('Отменен'),
                        },
                        {
                            value: OrderStatus.COMPLETED,
                            text: t('Выполнен'),
                        },
                    ]}
                />
            </HStack>
            <HStack
                gap={20}
            >
                <ButtonDesktop
                    theme={ButtonDesktopTheme.PRIMARY}
                    className={isChanged ? undefined : cls.btnOpacity}
                    onClick={onSaveClick}
                >
                    {t('Сохранить')}
                </ButtonDesktop>
            </HStack>
        </VStack>
    );
});
