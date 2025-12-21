import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from "@nestjs/common";

export interface ImageValidationOptions {
    maxSize: number;
    fieldName: string;
    types: string[];
}

@Injectable()
export class ImageValidationPipe implements PipeTransform<any> {

    constructor(private readonly options: ImageValidationOptions) {}

    async transform(value: Record<string, Express.Multer.File[]>, metadata: ArgumentMetadata): Promise<any> {
        const file = value?.[this.options.fieldName]?.[0];
        if (file) {
            const errors: string[] = [];

            if (!file.mimetype.includes('image')) {
                errors.push("required image");
            }

            if (!this.options.types.includes(file.mimetype.split('/')[1])) {
                errors.push(`required image with type ${this.options.types.join(', ')}`);
            }

            if (file.size > (this.options.maxSize * 1024 * 1024)) {
                errors.push(`invalid size image < ${this.options.maxSize}mb`)
            }

            if (errors.length) {
                throw new HttpException({[this.options.fieldName]: errors}, HttpStatus.BAD_REQUEST)
            }
        }

        return value;
    }
}