import {IsOptional, IsString, Length} from "class-validator";
import {IsUndefined} from "../../decorators/IsUndefined";

export class CreateNewsDto {
    @IsOptional()
    @IsString({message: 'required string'})
    @Length(1, 250, {message: 'required length from 1 to 250'})
    readonly title: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(1, 512, {message: 'required length from 1 to 512'})
    readonly description: string;

    @IsUndefined({message: 'can be only image in form-data'})
    coverImg?: string;

    timestamp: number;
}
