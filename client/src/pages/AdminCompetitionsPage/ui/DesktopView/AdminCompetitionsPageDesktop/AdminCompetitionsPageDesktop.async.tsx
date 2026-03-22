import { lazy } from 'react';

export const AdminCompetitionsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminCompetitionsPageDesktop')), 500);
}));
