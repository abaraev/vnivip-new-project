import { lazy } from 'react';

export const ActsPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ActsPageMobile')), 1000);
}));
