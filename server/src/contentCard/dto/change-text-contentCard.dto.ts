import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class ChangeTextContentCardDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 64, {message: 'required length from 1 to 64'})
    readonly page: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly contentCardPosition: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(0, 2048, {message: 'required length from 0 to 2048'})
    readonly text: string;
}