import {IsNotEmpty, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";
import {IsUndefined} from "../../decorators/IsUndefined";

export class ChangeCoverDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly newsId: string;

    @IsUndefined({message: 'can be only image in form-data'})
    coverImg?: string;
}
