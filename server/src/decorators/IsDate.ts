import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'IsDate',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    console.log(value)
                    if (typeof value === 'string') {
                        // @ts-ignore
                        if (!isNaN(new Date(value))) return true;
                    }
                    return false;
                },
            }
        });
    }
}