import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsIntString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'IsIntString',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value === 'string' && /^[0-9]\d*$/.test(value)) {
                        return true;
                    }
                    return false;
                },
            }
        });
    }
}