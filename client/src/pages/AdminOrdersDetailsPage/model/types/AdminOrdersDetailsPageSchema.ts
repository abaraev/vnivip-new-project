import { Order, OrderStatus } from 'entities/Order';

export interface AdminOrdersDetailsPageSchema {
    isLoading: boolean;
    error: string | undefined;
    _inited: boolean;
    order?: Order;
    orderStatus?: OrderStatus;
    isChanged: boolean;
}
