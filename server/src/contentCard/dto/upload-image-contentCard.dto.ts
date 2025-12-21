import {IsNotEmpty, IsString, Length} from "class-validator";
import {IsUndefined} from "../../decorators/IsUndefined";
import {IsIntString} from "../../decorators/IsIntString";

export class UploadImageContentCardDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 64, {message: 'required length from 1 to 64'})
    readonly page: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly contentCardPosition: string;


    @IsUndefined({message: 'can be only image in form-data'})
    image?: string;
}