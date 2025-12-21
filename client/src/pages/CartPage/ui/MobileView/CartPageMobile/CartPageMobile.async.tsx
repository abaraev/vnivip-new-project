import { lazy } from 'react';

export const CartPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./CartPageMobile')), 1000);
}));
