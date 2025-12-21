import { CartPageValidateErrorTypes } from '../types/CartPageValidateErrorTypes';

export const validateEmail = (email: string) => {
    if (!email) {
        return [CartPageValidateErrorTypes.EMPTY_EMAIL_ERROR];
    }

    const errors: CartPageValidateErrorTypes[] = [];

    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    const isCurrentEmailLength = email.length >= 3 && email.length <= 128;
    if (!isValidEmail || !isCurrentEmailLength) {
        errors.push(CartPageValidateErrorTypes.FORMAT_EMAIL_ERROR);
    }

    return errors;
};
