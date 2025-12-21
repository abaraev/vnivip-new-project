import {IsNotEmpty, IsString, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class ChangeNameServiceDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly serviceId: string;

    @IsString({message: 'required string'})
    @Length(0, 128, {message: 'required length from 1 to 128'})
    readonly name: string;
}