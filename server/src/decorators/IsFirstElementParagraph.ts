import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsFirstElementParagraph(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        return registerDecorator({
            name: 'IsFirstElementParagraph',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    console.log(value)
                    if (value === 'media' || value === 'text') return true;
                    return false;
                },
            }
        });
    }
}