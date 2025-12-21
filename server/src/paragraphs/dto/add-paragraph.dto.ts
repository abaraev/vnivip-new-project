import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";
import {IsAlign} from "../../decorators/IsAlign";
import {IsFirstElementParagraph} from "../../decorators/IsFirstElementParagraph";

export class AddParagraphDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly newsId: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(0, 2048, {message: 'required length from 0 to 2048'})
    readonly text?: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly img?: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly video?: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly videoPoster?: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsAlign({message: 'required left, center, right or justify'})
    readonly alignText: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsFirstElementParagraph({message: 'required text or media'})
    readonly firstElement: string;
}