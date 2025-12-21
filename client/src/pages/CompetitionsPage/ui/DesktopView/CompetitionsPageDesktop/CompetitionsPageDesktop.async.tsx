import { lazy } from 'react';

export const CompetitionsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./CompetitionsPageDesktop')), 1000);
}));
