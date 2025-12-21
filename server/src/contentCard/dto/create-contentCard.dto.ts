import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {IsUndefined} from "../../decorators/IsUndefined";
import {IsIntString} from "../../decorators/IsIntString";

export class CreateContentCardDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 64, {message: 'required length from 1 to 64'})
    readonly page: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(1, 2048, {message: 'required length from 1 to 2048'})
    readonly text: string;

    @IsUndefined({message: 'can be only image in form-data'})
    img?: string;

    @IsUndefined({message: 'can be only video in form-data'})
    video?: string;

    videoPoster?: string;

    alignText?: string

    position?: number;

    firstElement?: string;
}