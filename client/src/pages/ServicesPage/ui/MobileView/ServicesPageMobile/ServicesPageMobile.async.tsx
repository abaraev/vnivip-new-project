import { lazy } from 'react';

export const ServicesPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ServicesPageMobile')), 1000);
}));
