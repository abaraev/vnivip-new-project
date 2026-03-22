import { lazy } from 'react';

export const AdminRecentEventsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminRecentEventsPageDesktop')), 500);
}));
