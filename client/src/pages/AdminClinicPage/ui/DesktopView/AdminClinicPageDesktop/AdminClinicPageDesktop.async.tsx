import { lazy } from 'react';

export const AdminClinicPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminClinicPageDesktop')), 500);
}));
