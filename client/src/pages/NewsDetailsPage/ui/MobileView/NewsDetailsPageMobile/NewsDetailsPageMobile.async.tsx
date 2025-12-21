import { lazy } from 'react';

export const NewsDetailsPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./NewsDetailsPageMobile')), 1000);
}));
