import { lazy } from 'react';

export const MainPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./MainPageDesktop')), 1000);
}));
