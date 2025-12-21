import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { AdminNewsPageListDesktop } from '../AdminNewsPageListDesktop/AdminNewsPageListDesktop';
import { fetchAddNews } from '../../../model/services/fetchAddNews';
import { fetchNews } from '../../../model/services/fetchNews';
import { AdminNewsPageActions, AdminNewsPageReducer } from '../../../model/slices/AdminNewsPageSlice';
import { getAdminNewsPageInited } from '../../../model/selectors/getAdminNewsPage';
import cls from './AdminNewsPageDesktop.module.scss';

interface AdminNewsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminNewsPage: AdminNewsPageReducer,
};

export const CURRENT_PAGE_ID = 'CURRENT_PAGE_ID';

const AdminNewsPageDesktop = memo((props: AdminNewsPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const dispatch = useAppDispatch();
    const inited = useSelector(getAdminNewsPageInited);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchNews());
            dispatch(AdminNewsPageActions.init());
        }
    }, [dispatch, inited]);

    const fetchAddNewsFunc = useCallback(() => {
        dispatch(fetchAddNews());
    }, [dispatch]);

    const debouncedFetchAddNewsFunc = useDebounce(fetchAddNewsFunc, 1000);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AdminNewsPageDesktop, {}, [className])}
                maxH
                maxW
                padding={30}
                id={CURRENT_PAGE_ID}
                gap={40}
            >
                <HStack
                    maxW
                    justify="center"
                >
                    <ButtonDesktop
                        theme={ButtonDesktopTheme.PRIMARY}
                        onClick={debouncedFetchAddNewsFunc}
                    >
                        {t('Добавить новость')}
                    </ButtonDesktop>
                </HStack>
                <AdminNewsPageListDesktop />
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminNewsPageDesktop;
