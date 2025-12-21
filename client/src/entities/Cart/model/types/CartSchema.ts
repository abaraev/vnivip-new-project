export interface CartService {
    id: number;
    amount: number;
}

export interface CartSchema {
    services: CartService[];
}
