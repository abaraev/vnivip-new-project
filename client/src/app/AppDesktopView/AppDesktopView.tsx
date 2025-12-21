import React, {
    MutableRefObject, UIEvent, useMemo, useRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouterDesktop } from 'app/providers/router';
import { HeaderDesktop } from 'widgets/Header';
import { FooterDesktop } from 'widgets/Footer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUIScrollByPath, uiActions } from 'features/UI';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { APP_DESKTOP_ID } from 'shared/const/components';
import { PageLoaderDesktop } from 'widgets/PageLoader';
import { AdminSidebarDesktop } from 'widgets/AdminSidebar';
import { getAdminData } from 'entities/Admin';

const AppDesktopView = () => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getUIScrollByPath(state, pathname),
    );
    const isAuth = useSelector(getAdminData);

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(uiActions.setScrollPosition({
            position: e?.currentTarget?.scrollTop,
            path: pathname,
        }));
    }, 50);

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, [pathname]);

    const showAdminSidebar = useMemo(() => pathname.includes('admin_')
        && !pathname.includes('auth')
        && Boolean(isAuth), [pathname, isAuth]);

    return (
        <div
            className={classNames('app_desktop', { flex: showAdminSidebar }, [])}
            ref={wrapperRef}
            onScroll={onScroll}
            id={APP_DESKTOP_ID}
        >
            {showAdminSidebar
                ? (
                    <AdminSidebarDesktop />
                )
                : null}

            <HeaderDesktop
                isFixed={scrollPosition > 400}
            />
            <AppRouterDesktop />
            <FooterDesktop />
            <PageLoaderDesktop />
        </div>
    );
};

export default AppDesktopView;
