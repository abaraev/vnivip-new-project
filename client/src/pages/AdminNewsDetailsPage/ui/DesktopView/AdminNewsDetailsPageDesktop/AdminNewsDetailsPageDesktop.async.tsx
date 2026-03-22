import { lazy } from 'react';

export const AdminNewsDetailsPageDesktopAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AdminNewsDetailsPageDesktop')), 500);
}));
