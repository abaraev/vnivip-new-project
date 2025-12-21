import { lazy } from 'react';

export const ActsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ActsPageDesktop')), 1000);
}));
