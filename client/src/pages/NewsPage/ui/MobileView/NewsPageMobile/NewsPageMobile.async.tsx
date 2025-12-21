import { lazy } from 'react';

export const NewsPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./NewsPageMobile')), 1000);
}));
