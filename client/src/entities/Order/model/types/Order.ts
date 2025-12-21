export enum OrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface Order {
    id: number;
    name: string;
    secondName: string;
    phone: string;
    email: string;
    cart: string;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}
