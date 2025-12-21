import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { HStack, VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { OrderDesktop } from 'entities/Order';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { fetchOrders } from '../../../model/services/fetchOrders';
import { AdminOrdersPageActions, AdminOrdersPageReducer } from '../../../model/slices/AdminOrdersPageSlice';
import { getAdminOrdersPageInited, getAdminOrdersPageOrders } from '../../../model/selectors/getAdminOrdersPage';
import cls from './AdminOrdersPageDesktop.module.scss';

interface AdminOrdersPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminOrdersPage: AdminOrdersPageReducer,
};

const AdminOrdersPageDesktop = memo((props: AdminOrdersPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getAdminOrdersPageInited);
    const orders = useSelector(getAdminOrdersPageOrders);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchOrders());
            dispatch(AdminOrdersPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AdminOrdersPageDesktop, {}, [className])}
                maxH
            >
                <HStack
                    maxW
                    padding={30}
                    gap={30}
                    wrap="wrap"
                >
                    {orders?.map((order) => (
                        <OrderDesktop data={order} />
                    ))}
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminOrdersPageDesktop;
