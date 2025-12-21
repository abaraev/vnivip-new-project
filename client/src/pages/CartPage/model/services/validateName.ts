import { CartPageValidateErrorTypes } from '../types/CartPageValidateErrorTypes';

export const validateName = (name: string) => {
    if (!name) {
        return [CartPageValidateErrorTypes.EMPTY_NAME_ERROR];
    }

    const errors: CartPageValidateErrorTypes[] = [];

    const isValidName = /^[\p{L}\s]+$/u.test(name);
    const isCurrentNameLength = name.length >= 1 && name.length <= 128;
    if (!isValidName || !isCurrentNameLength) {
        errors.push(CartPageValidateErrorTypes.FORMAT_NAME_ERROR);
    }

    return errors;
};
