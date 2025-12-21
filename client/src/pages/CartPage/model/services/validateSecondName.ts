import { CartPageValidateErrorTypes } from '../types/CartPageValidateErrorTypes';

export const validateSecondName = (secondName: string) => {
    if (!secondName) {
        return [];
    }

    const errors: CartPageValidateErrorTypes[] = [];

    const isValidSecondName = /^[\p{L}\s]+$/u.test(secondName);
    const isCurrentSecondNameLength = secondName.length >= 0 && secondName.length <= 128;
    if (!isValidSecondName || !isCurrentSecondNameLength) {
        errors.push(CartPageValidateErrorTypes.FORMAT_SECOND_NAME_ERROR);
    }

    return errors;
};
