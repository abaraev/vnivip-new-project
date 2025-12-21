import {IsNotEmpty, IsString, Length} from "class-validator";

export class GetServicesPartDto {
    @IsNotEmpty({message: 'cannot be empty'})
    @IsString({message: 'required string'})
    @Length(1, 256, {message: 'required length from 1 to 256'})
    readonly ids: string;
}