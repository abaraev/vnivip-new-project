import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationError} from "class-validator/types/validation/ValidationError";

@Injectable()
export class BodyValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (metadata.type === 'body' || metadata.type === 'query') {
            const obj = plainToClass(metadata.metatype, value);
            const errors: ValidationError[] = await validate(obj);
            if (errors.length) {
                const messages = {};
                errors.forEach(err => {
                    messages[err.property] = Object.values(err.constraints)
                })
                throw new HttpException(messages, HttpStatus.BAD_REQUEST)
            }
        }

        return value;
    }
}