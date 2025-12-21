import { Service } from 'entities/Service';
import { Document } from 'entities/Document';
import { CartPageValidateErrorTypes } from './CartPageValidateErrorTypes';

export interface CartPageSchema {
    isLoading: boolean;
    error?: string;
    services?: Service[];
    name: string;
    secondName: string;
    phone: string;
    email: string;
    comment: string;
    documents: Document[];
    validationErrors: CartPageValidateErrorTypes[];
    orderSent: boolean;
    _orderNumber?: number;
    _inited: boolean;
}
