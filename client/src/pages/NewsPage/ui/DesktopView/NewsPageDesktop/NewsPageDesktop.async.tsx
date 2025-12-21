import { lazy } from 'react';

export const NewsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./NewsPageDesktop')), 1000);
}));
