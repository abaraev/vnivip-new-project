import {IsNotEmpty, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";
import {IsUndefined} from "../../decorators/IsUndefined";

export class ChangeCoverServiceDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly serviceId: string;

    @IsUndefined({message: 'can be only image in form-data'})
    coverImg?: string;
}