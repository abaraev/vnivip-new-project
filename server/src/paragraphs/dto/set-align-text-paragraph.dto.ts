import {IsNotEmpty, Length} from "class-validator";
import {IsAlign} from "../../decorators/IsAlign";
import {IsIntString} from "../../decorators/IsIntString";

export class SetAlignTextParagraphDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsAlign({message: 'required left, center, right or justify'})
    readonly alignText: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly paragraphPosition: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 32, {message: 'required length from 1 to 32'})
    readonly newsId: string;
}