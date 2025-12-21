import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from "@nestjs/common";

export interface VideoValidationOptions {
    maxSize: number;
    fieldName: string;
    types: string[];
}

@Injectable()
export class VideoValidationPipe implements PipeTransform<any> {

    constructor(private readonly options: VideoValidationOptions) {}

    async transform(value: Record<string, Express.Multer.File[]>, metadata: ArgumentMetadata): Promise<any> {
        const file = value[this.options.fieldName]?.[0];
        if (file) {
            const errors: string[] = [];

            if (!file.mimetype.includes('video')) {
                errors.push("required video");
            }
            if (!this.options.types.includes(file.mimetype.split('/')[1])) {
                errors.push(`required video with type ${this.options.types.join(', ')}`);
            }

            if (file.size > (this.options.maxSize * 1024 * 1024)) {
                errors.push(`invalid size video < ${this.options.maxSize}mb`)
            }

            if (errors.length) {
                throw new HttpException({[this.options.fieldName]: errors}, HttpStatus.BAD_REQUEST)
            }
        }

        return value;
    }
}