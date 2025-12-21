import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getCart } from 'entities/Cart';
import { Order } from 'entities/Order';
import { CartPageValidateErrorTypes } from '../types/CartPageValidateErrorTypes';
import { validateSecondName } from './validateSecondName';
import { validatePhone } from './validatePhone';
import { validateEmail } from './validateEmail';
import { validateName } from './validateName';
import {
    getCartPageComment,
    getCartPageDocuments,
    getCartPageEmail,
    getCartPageName,
    getCartPagePhone,
    getCartPageSecondName,
} from '../selectors/getCartPage';

export const sendOrder = createAsyncThunk<
    Order,
    void,
    ThunkConfig<any>
>(
    'pages/CartPage/sendOrder',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const name = getCartPageName(getState());
        const comment = getCartPageComment(getState());
        const secondName = getCartPageSecondName(getState());
        const phone = getCartPagePhone(getState());
        const email = getCartPageEmail(getState());
        const cart = getCart(getState());
        const stateDocuments = getCartPageDocuments(getState());

        const errors: CartPageValidateErrorTypes[] = [
            ...validateSecondName(secondName),
            ...validateName(name),
            ...validatePhone(phone),
            ...validateEmail(email),
        ];

        if (!cart?.length) {
            errors.push(CartPageValidateErrorTypes.EMPTY_CART_ERROR);
        }

        if (errors.length) {
            return rejectWithValue(errors);
        }

        const body = {
            name,
            secondName,
            phone,
            email,
            cart: JSON.stringify(cart),
            documents: JSON.stringify(stateDocuments),
            comment,
        };

        const { documents, ...withoutDocuments } = body;

        try {
            const response = await extra.api.post<Order>(
                '/orders',
                stateDocuments.length ? body : withoutDocuments,
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
