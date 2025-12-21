import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getCart = (state: StateSchema) => state.cart?.services;

export const getServiceById = createSelector(
    getCart,
    (state: StateSchema, id: number) => id,
    (services, id) => services.find((service) => service.id === id),
);
