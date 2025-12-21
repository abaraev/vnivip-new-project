import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from "@nestjs/common";

export interface DocumentValidationOptions {
    maxSize: number;
    fieldName: string;
}

@Injectable()
export class DocumentValidationPipe implements PipeTransform<any> {

    constructor(private readonly options: DocumentValidationOptions) {}

    async transform(value: Record<string, Express.Multer.File[]>, metadata: ArgumentMetadata): Promise<any> {
        const file = value?.[this.options.fieldName]?.[0];
        if (file) {
            const errors: string[] = [];

            if (!file.mimetype.includes('document')
                && !file.mimetype.includes('pdf')
                && !file.mimetype.includes('text')) {
                errors.push("required document");
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