import {IsNotEmpty, IsString, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class ChangeEmailMemberDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly memberId: string;

    @IsString({message: 'required string'})
    @Length(0, 64, {message: 'required length from 0 to 64'})
    readonly email: string;
}