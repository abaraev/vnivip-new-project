import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsAlign(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'IsAlign',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    console.log(value)
                    if (value === 'left' || value === 'center' || value === 'right' || value === 'justify') return true;
                    return false;
                },
            }
        });
    }
}