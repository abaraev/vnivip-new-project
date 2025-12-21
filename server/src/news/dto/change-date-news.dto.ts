import {IsInt, IsNotEmpty, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class ChangeDateNewsDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly newsId: number;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsInt({message: 'required integer'})
    readonly timestamp: number;
}
