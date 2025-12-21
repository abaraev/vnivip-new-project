import {IsNotEmpty, IsString, Length} from "class-validator";

export class CreateVacancyDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly jobName: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 8192, {message: 'required length from 1 to 8192'})
    readonly description: string;
}