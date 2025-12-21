import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class ChangeTextParagraphDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly newsId: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly paragraphPosition: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(0, 2048, {message: 'required length from 0 to 2048'})
    readonly text: string;
}