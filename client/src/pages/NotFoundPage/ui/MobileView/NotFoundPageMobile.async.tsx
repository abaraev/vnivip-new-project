import { lazy } from 'react';

export const NotFoundPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./NotFoundPageMobile')), 1000);
}));
