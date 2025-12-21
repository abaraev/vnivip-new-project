import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";
import {OrderStatus} from "../types/OrderStatus";

export function IsOrderStatus(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {


        return registerDecorator({
            name: 'IsOrderStatus',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (value === OrderStatus.PENDING
                        || value === OrderStatus.CANCELLED
                        || value === OrderStatus.COMPLETED) return true;
                    return false;
                },
            }
        });
    }
}