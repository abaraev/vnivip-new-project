import React, { useEffect } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isDesktop, isMobile } from 'react-device-detect';
import { CartSliceActions } from 'entities/Cart';
import { fetchRefreshAuth } from 'entities/Admin';
import { useLocation } from 'react-router-dom';
import { AppDesktopViewAsync as AppDesktopView } from './AppDesktopView/AppDesktopView.async';
import { AppMobileViewAsync as AppMobileView } from './AppMobileView/AppMobileView.async';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        document.body.classList.add(theme);

        return () => {
            document.body.classList.remove(theme);
        };
    }, [theme]);

    useEffect(() => {
        dispatch(CartSliceActions.updateCart());
    }, [dispatch]);

    useEffect(() => {
        if (pathname.includes('admin_')) {
            dispatch(fetchRefreshAuth());
        }
    }, [dispatch, pathname]);

    if (isDesktop) {
        return <AppDesktopView />;
    }

    if (isMobile) {
        return <AppMobileView />;
    }

    return null;
}

export default App;
