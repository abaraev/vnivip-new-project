import { CartPageValidateErrorTypes } from '../types/CartPageValidateErrorTypes';

export const validatePhone = (phone: string) => {
    if (!phone) {
        return [CartPageValidateErrorTypes.EMPTY_PHONE_ERROR];
    }

    const errors: CartPageValidateErrorTypes[] = [];

    const isValidPhone = /^\d+$/.test(phone);
    const isCurrentPhoneLength = phone.length >= 7 && phone.length <= 15;
    if (!isValidPhone || !isCurrentPhoneLength) {
        errors.push(CartPageValidateErrorTypes.FORMAT_PHONE_ERROR);
    }

    return errors;
};
