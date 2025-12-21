import { Order } from 'entities/Order';

export interface AdminOrdersPageSchema {
    isLoading: boolean;
    error?: string;
    orders: Order[];
    _inited: boolean;
}
