import {IsUndefined} from "../../decorators/IsUndefined";
import {IsNotEmpty, IsNumberString, IsString, Length} from "class-validator";

export class CreateServiceDto {
    @IsUndefined({message: 'can be only image in form-data'})
    coverImg?: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsNumberString({}, {message: 'required number string'})
    @Length(1, 12, {message: 'required length from 1 to 12'})
    readonly price: number;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly name: string;
}