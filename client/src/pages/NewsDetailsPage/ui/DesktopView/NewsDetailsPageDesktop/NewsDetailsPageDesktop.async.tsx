import { lazy } from 'react';

export const NewsDetailsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./NewsDetailsPageDesktop')), 1000);
}));
