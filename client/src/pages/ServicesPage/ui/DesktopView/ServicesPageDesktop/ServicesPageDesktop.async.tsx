import { lazy } from 'react';

export const ServicesPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ServicesPageDesktop')), 1000);
}));
