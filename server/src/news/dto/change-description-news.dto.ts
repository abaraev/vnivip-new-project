import {IsNotEmpty, IsString, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class ChangeDescriptionNewsDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 512, {message: 'required length from 1 to 512'})
    readonly description: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly newsId: string;
}
