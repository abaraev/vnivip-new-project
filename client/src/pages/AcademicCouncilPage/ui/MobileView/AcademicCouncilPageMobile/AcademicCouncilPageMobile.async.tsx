import { lazy } from 'react';

export const AcademicCouncilPageMobileAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AcademicCouncilPageMobile')), 1000);
}));
