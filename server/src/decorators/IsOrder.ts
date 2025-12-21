import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsOrder(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'IsOrder',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    console.log(value)
                    if (value === 'ASC' || value === 'DESC') return true;
                    return false;
                },
            }
        });
    }
}