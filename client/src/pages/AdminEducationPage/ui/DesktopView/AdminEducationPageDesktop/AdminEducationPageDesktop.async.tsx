import { lazy } from 'react';

export const AdminEducationPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminEducationPageDesktop')), 1000);
}));
