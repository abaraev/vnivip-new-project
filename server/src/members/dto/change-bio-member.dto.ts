import {IsNotEmpty, IsString, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class ChangeBioMemberDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly memberId: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(0, 4096, {message: 'required length from 0 to 4096'})
    readonly bio: string;
}