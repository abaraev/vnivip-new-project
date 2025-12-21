import { lazy } from 'react';

export const CartPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./CartPageDesktop')), 1000);
}));
