import { lazy } from 'react';

export const VacanciesPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./VacanciesPageDesktop')), 1000);
}));
