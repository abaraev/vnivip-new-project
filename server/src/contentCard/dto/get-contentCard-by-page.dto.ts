import {IsNotEmpty, IsString, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class GetContentCardByPageDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 64, {message: 'required length from 1 to 64'})
    readonly page: string;
}