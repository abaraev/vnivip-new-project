import {IsNotEmpty, IsNumberString, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class ChangePriceServiceDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly serviceId: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsNumberString({}, {message: 'required number string'})
    @Length(1, 12, {message: 'required length from 1 to 12'})
    readonly price: string;
}