import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 128, {message: 'required length from 1 to 128'})
    readonly name: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(0, 128, {message: 'required length from 0 to 128'})
    readonly secondName: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(7, 15, {message: 'required length from 1 to 128'})
    readonly phone: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(3, 128, {message: 'required length from 1 to 128'})
    readonly email: string;

    @IsOptional()
    @IsString({message: 'required string'})
    @Length(0, 250, {message: 'required length from 0 to 250'})
    readonly comment: string;

    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    readonly cart: string;

    @IsOptional()
    @IsString({message: 'required string'})
    readonly documents: string;
}