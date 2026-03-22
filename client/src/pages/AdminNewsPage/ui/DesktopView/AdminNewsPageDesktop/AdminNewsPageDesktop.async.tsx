import { lazy } from 'react';

export const AdminNewsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminNewsPageDesktop')), 500);
}));
