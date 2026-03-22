import { lazy } from 'react';

export const NotFoundPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./NotFoundPageDesktop')), 500);
}));
