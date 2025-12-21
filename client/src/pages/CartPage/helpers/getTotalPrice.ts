import { Service } from 'entities/Service';
import { CartService } from 'entities/Cart';

export const getTotalPrice = (cart: CartService[], services: Service[]): string => {
    let sum = 0;

    services.forEach((service) => {
        cart.forEach((cartService) => {
            if (service.id === cartService.id) {
                sum += service.price * cartService.amount;
            }
        });
    });

    return sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
};
