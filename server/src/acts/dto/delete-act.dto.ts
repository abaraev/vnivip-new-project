import {IsUndefined} from "../../decorators/IsUndefined";
import {IsNotEmpty, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class DeleteActDto {
    @IsUndefined({message: 'can be only document in form-data'})
    staticFile?: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly actId: string;
}