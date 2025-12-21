import {IsNotEmpty, Length} from "class-validator";
import {IsIntString} from "../../decorators/IsIntString";

export class DeleteVacancyDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsIntString({message: 'required integer string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly vacancyId: string;
}