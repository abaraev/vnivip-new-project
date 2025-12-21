import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { fetchDeleteService } from '../../../model/services/fetchDeleteService';
import cls from './AdminServicesDetailsTitlePageDesktop.module.scss';

interface AdminServicesDetailsTitlePageDesktopProps {
    className?: string;
}

export const AdminServicesDetailsTitlePageDesktop = memo((props: AdminServicesDetailsTitlePageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onDelete = useCallback(async () => {
        const result = await dispatch(fetchDeleteService());
        if (result.meta.requestStatus === 'fulfilled') {
            navigate(RoutePath.admin_services);
        }
    }, [dispatch, navigate]);

    return (
        <HStack
            className={classNames(cls.AdminServicesDetailsTitlePageDesktop, {}, [className])}
            maxW
            justify="end"
        >
            <ButtonDesktop
                theme={ButtonDesktopTheme.OUTLINE_RED}
                onClick={onDelete}
            >
                {t('Удалить')}
            </ButtonDesktop>
        </HStack>
    );
});
