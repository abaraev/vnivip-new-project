import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import {
    AdminOrdersDetailsCartPageDesktop,
} from '../AdminOrdersDetailsCartPageDesktop/AdminOrdersDetailsCartPageDesktop';
import {
    AdminOrdersDetailsTitlePageDesktop,
} from '../AdminOrdersDetailsTitlePageDesktop/AdminOrdersDetailsTitlePageDesktop';
import { fetchNewOrder } from '../../../model/services/fetchNewOrder';
import { getAdminOrdersDetailsPageOrder } from '../../../model/selectors/getAdminOrdersDetailsPage';
import { AdminOrdersDetailsPageReducer } from '../../../model/slices/AdminOrdersDetailsPageSlice';
import cls from './AdminOrdersDetailsPageDesktop.module.scss';
import {
    AdminOrdersDetailsContactsPageDesktop,
} from '../AdminOrdersDetailsContactsPageDesktop/AdminOrdersDetailsContactsPageDesktop';

interface AdminOrdersDetailsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminOrdersDetailsPage: AdminOrdersDetailsPageReducer,
};

const AdminOrdersDetailsPageDesktop = memo((props: AdminOrdersDetailsPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const order = useSelector(getAdminOrdersDetailsPageOrder);

    useEffect(() => {
        dispatch(fetchNewOrder({ orderId: Number(id) }));
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <VStack
                className={classNames(cls.AdminOrdersDetailsPageDesktop, {}, [className])}
                maxH
                maxW
                padding={30}
                gap={50}
            >
                <AdminOrdersDetailsTitlePageDesktop />
                <AdminOrdersDetailsContactsPageDesktop />
                <AdminOrdersDetailsCartPageDesktop />
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminOrdersDetailsPageDesktop;
