import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import {
    AdminServicesDetailsFormPageDesktop,
} from 'pages/AdminServicesDetailsPage/ui/DesktopView/AdminServicesDetailsFormPageDesktop/AdminServicesDetailsFormPageDesktop';
import {
    AdminServicesDetailsPageReducer,
} from '../../../model/slices/AdminServicesDetailsPageSlice';
import {
    AdminServicesDetailsTitlePageDesktop,
} from '../AdminServicesDetailsTitlePageDesktop/AdminServicesDetailsTitlePageDesktop';
import { fetchService } from '../../../model/services/fetchService';
import { getAdminServicesDetailsPageService } from '../../../model/selectors/getAdminServicesDetailsPage';
import cls from './AdminServicesDetailsPageDesktop.module.scss';

interface AdminServicesDetailsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminServicesDetailsPage: AdminServicesDetailsPageReducer,
};

const AdminServicesDetailsPageDesktop = memo((props: AdminServicesDetailsPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const service = useSelector(getAdminServicesDetailsPageService);

    useEffect(() => {
        dispatch(fetchService({ serviceId: Number(id) }));
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AdminServicesDetailsPageDesktop, {}, [className])}
                maxH
                maxW
                padding={30}
                gap={70}
            >
                <AdminServicesDetailsTitlePageDesktop />
                <AdminServicesDetailsFormPageDesktop />
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminServicesDetailsPageDesktop;
