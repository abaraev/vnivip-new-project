import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsUndefined(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'IsUndefined',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!value) {
                        return true;
                    }
                    return false;
                },
            }
        });
    }
}