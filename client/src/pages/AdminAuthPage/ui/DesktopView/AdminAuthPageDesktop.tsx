import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page';
import { useTranslation } from 'react-i18next';
import { AdminAuthFormDesktop } from 'features/AdminAuthForm';
import { VStack } from 'shared/ui/Stack';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdminData } from 'entities/Admin';
import cls from './AdminAuthPageDesktop.module.scss';

interface AdminAuthPageDesktopProps {
    className?: string;
}

const AdminAuthPageDesktop = memo((props: AdminAuthPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const location = useLocation();
    const isAuth = useSelector(getAdminData);

    if (isAuth) {
        return <Navigate to="/admin_orders" state={{ from: location }} replace />;
    }

    return (
        <Page className={classNames(cls.AdminAuthPageDesktop, {}, [className])}>
            <VStack
                maxW
                maxH
                align="center"
                justify="center"
            >
                <AdminAuthFormDesktop />
            </VStack>
        </Page>
    );
});

export default AdminAuthPageDesktop;
