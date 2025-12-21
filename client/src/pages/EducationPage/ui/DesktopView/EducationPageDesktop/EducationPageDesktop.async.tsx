import { lazy } from 'react';

export const EducationPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./EducationPageDesktop')), 1000);
}));
