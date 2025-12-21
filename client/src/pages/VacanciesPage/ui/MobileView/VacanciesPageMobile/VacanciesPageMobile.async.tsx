import { lazy } from 'react';

export const VacanciesPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./VacanciesPageMobile')), 1000);
}));
