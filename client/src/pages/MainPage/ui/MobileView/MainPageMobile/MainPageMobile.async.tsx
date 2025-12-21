import { lazy } from 'react';

export const MainPageMobileAsync = lazy(() => new Promise((res) => {
    // @ts-ignore
    setTimeout(() => res(import('./MainPageMobile')), 1000);
}));
