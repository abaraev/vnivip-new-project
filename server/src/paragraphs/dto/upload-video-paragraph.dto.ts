import {IsNotEmpty, Length} from "class-validator";
import {IsUndefined} from "../../decorators/IsUndefined";
import {IsIntString} from "../../decorators/IsIntString";

export class UploadVideoParagraphDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly newsId: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly paragraphPosition: string;


    @IsUndefined({message: 'can be only video in form-data'})
    video?: string;
}