import { lazy } from 'react';

export const ScienceEducationActivityPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ScienceEducationActivityPageDesktop')), 1000);
}));
