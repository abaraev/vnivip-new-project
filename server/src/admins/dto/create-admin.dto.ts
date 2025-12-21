import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class CreateAdminDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly login: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly password: string;
}