import { lazy } from 'react';

export const ClinicPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ClinicPageDesktop')), 500);
}));
