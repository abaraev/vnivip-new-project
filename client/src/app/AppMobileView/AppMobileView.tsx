import React, {
    MutableRefObject, UIEvent, useEffect, useRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouterMobile } from 'app/providers/router';
import { HeaderMobile } from 'widgets/Header';
import { FooterMobile } from 'widgets/Footer';
import { PageLoaderMobile } from 'widgets/PageLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUIScrollByPath, uiActions } from 'features/UI';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { APP_MOBILE_ID } from 'shared/const/components';

const AppMobileView = () => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getUIScrollByPath(state, pathname),
    );

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(uiActions.setScrollPosition({
            position: e?.currentTarget?.scrollTop,
            path: pathname,
        }));
    }, 50);

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, [pathname]);

    useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
        * {
            -webkit-tap-highlight-color: transparent;
        }
        `;
        document.head.appendChild(styleSheet);
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.setAttribute(
                'content',
                'width=device-width, user-scalable=yes, initial-scale=1.0',
            );
        }
    }, [dispatch]);

    return (
        <div
            className={classNames('app_mobile', {}, [])}
            ref={wrapperRef}
            onScroll={onScroll}
            id={APP_MOBILE_ID}
        >
            <HeaderMobile
                isFixed={scrollPosition > 400}
            />
            <AppRouterMobile />
            <FooterMobile />
            <PageLoaderMobile />
        </div>
    );
};

export default AppMobileView;
