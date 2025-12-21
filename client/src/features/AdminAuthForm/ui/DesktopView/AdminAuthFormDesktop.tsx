import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import {
    getAdminAuthFormError,
    getAdminAuthFormLogin,
    getAdminAuthFormPassword,
} from '../../model/selectors/getAdminAuthForm';
import { AdminAuthFormActions, AdminAuthFormReducer } from '../../model/slices/AdminAuthFormSlice';
import cls from './AdminAuthFormDesktop.module.scss';
import { fetchLogin } from '../../model/services/fetchLogin';

interface AdminAuthFormDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminAuthForm: AdminAuthFormReducer,
};

export const AdminAuthFormDesktop = memo((props: AdminAuthFormDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const dispatch = useAppDispatch();
    const login = useSelector(getAdminAuthFormLogin);
    const password = useSelector(getAdminAuthFormPassword);
    const error = useSelector(getAdminAuthFormError);

    const fetchLoginFunc = useCallback(() => {
        dispatch(fetchLogin());
    }, [dispatch]);

    const debouncedFetchLoginFunc = useDebounce(fetchLoginFunc, 1000);

    const onLoginClick = useCallback(() => {
        debouncedFetchLoginFunc();
    }, [debouncedFetchLoginFunc]);

    const onChangeLogin = useCallback((value: string) => {
        if (!value.startsWith(' ') && !value.endsWith('  ')) {
            if (value.length <= 128) {
                dispatch(AdminAuthFormActions.setLogin(value));
            }
        }
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        if (!value.startsWith(' ') && !value.endsWith('  ')) {
            if (value.length <= 128) {
                dispatch(AdminAuthFormActions.setPassword(value));
            }
        }
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AdminAuthFormDesktop, {}, [className])}
                align="center"
                gap={50}
                paddingT={50}
                paddingR={50}
                paddingL={50}
                paddingB={20}
            >
                <Text
                    size={TextSize.H3_DESKTOP}
                    theme={TextTheme.DARK2}
                >
                    {t('Вход в админ-панель')}
                </Text>
                <VStack
                    gap={30}
                    align="center"
                >
                    <Input
                        placeholder={t('Логин')}
                        isRequired
                        className={cls.input}
                        onChange={onChangeLogin}
                        value={login}
                        isEmptyError={!!error}
                    />
                    <Input
                        placeholder={t('Пароль')}
                        isRequired
                        className={cls.input}
                        type="password"
                        onChange={onChangePassword}
                        value={password}
                        isEmptyError={!!error}
                    />
                    <ButtonDesktop
                        theme={ButtonDesktopTheme.PRIMARY}
                        onClick={onLoginClick}
                    >
                        {t('Войти')}
                    </ButtonDesktop>
                    <Text
                        size={TextSize.BODY_MINI_DESKTOP}
                        theme={TextTheme.RED}
                        className={cls.error}
                    >
                        {error}
                    </Text>
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});
