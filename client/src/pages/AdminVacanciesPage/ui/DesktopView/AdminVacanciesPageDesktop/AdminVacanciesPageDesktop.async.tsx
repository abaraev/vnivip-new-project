import { lazy } from 'react';

export const AdminVacanciesPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminVacanciesPageDesktop')), 500);
}));
